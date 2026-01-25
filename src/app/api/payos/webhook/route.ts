import { NextResponse } from 'next/server';

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

export async function POST(request: Request) {
    try {
        const webhookData = await request.json() as WebhookData;

        console.log('Received PayOS webhook:', JSON.stringify(webhookData, null, 2));

        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

        if (!checksumKey) {
            console.error('PAYOS_CHECKSUM_KEY not configured');
            return NextResponse.json({ error: 'Webhook handler not configured' }, { status: 500 });
        }

        // Verify signature logic can be added here

        if (webhookData.code === '00' && webhookData.data.code === '00') {
            const { orderCode, amount, paymentLinkId } = webhookData.data;

            console.log(`Payment successful: Order ${orderCode}, Amount ${amount}, PaymentLink ${paymentLinkId}`);

            // TODO: Update database
            // await prisma.payment.update(...)
        }

        return NextResponse.json({
            success: true,
            message: 'Webhook received'
        });

    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({
            success: false,
            error: 'Processing error'
        });
    }
}
