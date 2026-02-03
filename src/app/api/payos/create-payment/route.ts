import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';

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

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderCode, amount, description, planId, buyerEmail } = body as PaymentRequestBody;

        if (!orderCode || !amount || !description) {
            return NextResponse.json({ error: 'Missing required fields: orderCode, amount, description' }, { status: 400 });
        }

        const clientId = process.env.PAYOS_CLIENT_ID;
        const apiKey = process.env.PAYOS_API_KEY;
        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

        if (!clientId || !apiKey || !checksumKey) {
            console.error('PayOS credentials not configured');
            return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
        }

        const baseUrl = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : 'http://localhost:3000';

        const cancelUrl = `${baseUrl}/#pricing`;
        const returnUrl = `${baseUrl}/payment-success?orderCode=${orderCode}&planId=${planId}`;

        const truncatedDescription = description.substring(0, 25);

        const signatureData = {
            amount,
            cancelUrl,
            description: truncatedDescription,
            orderCode,
            returnUrl
        };
        const signature = generateSignature(signatureData, checksumKey);

        // Save payment intention to database
        try {
            await prisma.payment.create({
                data: {
                    orderCode: String(orderCode),
                    amount,
                    planId,
                    status: 'PENDING',
                    paymentData: {
                        buyerEmail,
                        description,
                        createdAt: new Date().toISOString()
                    }
                }
            });
        } catch (dbError) {
            console.error('Failed to save payment record:', dbError);
            // We continue even if DB save fails? 
            // Better to fail here so we don't have dangling payments
            return NextResponse.json({ error: 'Failed to initialize order' }, { status: 500 });
        }

        const payosBody = {
            orderCode,
            amount,
            description: truncatedDescription,
            cancelUrl,
            returnUrl,
            signature,
            ...(buyerEmail && { buyerEmail })
        };

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
            return NextResponse.json({
                error: 'Payment request failed',
                details: data.desc || 'Unknown error'
            }, { status: 400 });
        }

        return NextResponse.json({
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
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
