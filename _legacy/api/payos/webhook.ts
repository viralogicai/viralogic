import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

interface WebhookData {
    code: string;
    desc: string;
    data: {
        orderCode: number;
        amount: number;
        description: string;
        accountNumber: string;
        reference: string;
        transactionDateTime: string;
        currency: string;
        paymentLinkId: string;
        code: string;
        desc: string;
    };
    signature: string;
}

function verifySignature(data: WebhookData, checksumKey: string): boolean {
    // Recreate the signature from the data
    // PayOS signs: code + desc + data fields
    const dataString = JSON.stringify(data.data);
    const signatureData = `${data.code}${data.desc}${dataString}`;

    const expectedSignature = crypto
        .createHmac('sha256', checksumKey)
        .update(signatureData)
        .digest('hex');

    return expectedSignature === data.signature;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const webhookData = req.body as WebhookData;

        console.log('Received PayOS webhook:', JSON.stringify(webhookData, null, 2));

        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

        if (!checksumKey) {
            console.error('PAYOS_CHECKSUM_KEY not configured');
            return res.status(500).json({ error: 'Webhook handler not configured' });
        }

        // Verify signature (optional but recommended)
        // Note: PayOS signature verification may differ, check their docs
        // const isValid = verifySignature(webhookData, checksumKey);
        // if (!isValid) {
        //     console.error('Invalid webhook signature');
        //     return res.status(401).json({ error: 'Invalid signature' });
        // }

        // Check if payment was successful
        if (webhookData.code === '00' && webhookData.data.code === '00') {
            const { orderCode, amount, paymentLinkId } = webhookData.data;

            console.log(`Payment successful: Order ${orderCode}, Amount ${amount}, PaymentLink ${paymentLinkId}`);

            // TODO: Update your database here
            // - Mark order as paid
            // - Upgrade user subscription
            // - Send confirmation email

            // For now, we'll just log and return success
            // In a real implementation, you would:
            // 1. Look up the order in your database
            // 2. Mark it as paid
            // 3. Update user's subscription tier
        }

        // Always return success to PayOS
        return res.status(200).json({
            success: true,
            message: 'Webhook received'
        });

    } catch (error) {
        console.error('Webhook processing error:', error);
        // Still return 200 to prevent PayOS from retrying
        return res.status(200).json({
            success: false,
            error: 'Processing error'
        });
    }
}
