import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const PAYOS_API_URL = 'https://api-merchant.payos.vn/v2/payment-requests';

interface PaymentRequestBody {
    orderCode: number;
    amount: number;
    description: string;
    planId: string;
    buyerEmail?: string;
}

function generateSignature(data: {
    amount: number;
    cancelUrl: string;
    description: string;
    orderCode: number;
    returnUrl: string;
}, checksumKey: string): string {
    // Sort data alphabetically and create query string
    const sortedData = `amount=${data.amount}&cancelUrl=${data.cancelUrl}&description=${data.description}&orderCode=${data.orderCode}&returnUrl=${data.returnUrl}`;

    return crypto
        .createHmac('sha256', checksumKey)
        .update(sortedData)
        .digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderCode, amount, description, planId, buyerEmail } = req.body as PaymentRequestBody;

        // Validate required fields
        if (!orderCode || !amount || !description) {
            return res.status(400).json({ error: 'Missing required fields: orderCode, amount, description' });
        }

        // Get credentials from environment
        const clientId = process.env.PAYOS_CLIENT_ID;
        const apiKey = process.env.PAYOS_API_KEY;
        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

        if (!clientId || !apiKey || !checksumKey) {
            console.error('PayOS credentials not configured');
            return res.status(500).json({ error: 'Payment service not configured' });
        }

        // Build URLs
        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000';

        const cancelUrl = `${baseUrl}/#pricing`;
        const returnUrl = `${baseUrl}/payment-success?orderCode=${orderCode}&planId=${planId}`;

        // Generate signature
        const signatureData = {
            amount,
            cancelUrl,
            description,
            orderCode,
            returnUrl
        };
        const signature = generateSignature(signatureData, checksumKey);

        // Prepare PayOS request body
        const payosBody = {
            orderCode,
            amount,
            description,
            cancelUrl,
            returnUrl,
            signature,
            ...(buyerEmail && { buyerEmail })
        };

        // Call PayOS API
        const response = await fetch(PAYOS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': clientId,
                'x-api-key': apiKey
            },
            body: JSON.stringify(payosBody)
        });

        const data = await response.json();

        if (data.code !== '00') {
            console.error('PayOS API error:', data);
            return res.status(400).json({
                error: 'Payment request failed',
                details: data.desc || 'Unknown error'
            });
        }

        // Return successful response
        return res.status(200).json({
            success: true,
            data: {
                checkoutUrl: data.data.checkoutUrl,
                qrCode: data.data.qrCode,
                accountNumber: data.data.accountNumber,
                accountName: data.data.accountName,
                amount: data.data.amount,
                description: data.data.description,
                orderCode: data.data.orderCode,
                paymentLinkId: data.data.paymentLinkId
            }
        });

    } catch (error) {
        console.error('Create payment error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
