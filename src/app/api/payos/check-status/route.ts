import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const PAYOS_API_URL = 'https://api-merchant.payos.vn/v2/payment-requests';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderCode = searchParams.get('orderCode');

        if (!orderCode) {
            return NextResponse.json({ error: 'Missing orderCode parameter' }, { status: 400 });
        }

        // First, check our local database for simulated/already processed payments
        const localPayment = await prisma.payment.findUnique({
            where: { orderCode: String(orderCode) }
        });

        if (localPayment && localPayment.status === 'PAID') {
            // Payment already marked as PAID in our database (could be from simulation or webhook)
            return NextResponse.json({
                success: true,
                data: {
                    orderCode: localPayment.orderCode,
                    status: 'PAID',
                    amount: localPayment.amount,
                    amountPaid: localPayment.amount,
                    amountRemaining: 0
                }
            });
        }

        // If not PAID locally, check PayOS API for real payment status
        const clientId = process.env.PAYOS_CLIENT_ID;
        const apiKey = process.env.PAYOS_API_KEY;

        if (!clientId || !apiKey) {
            console.error('PayOS credentials not configured');
            return NextResponse.json({ error: 'Payment service not configured' }, { status: 500 });
        }

        const response = await fetch(`${PAYOS_API_URL}/${orderCode}`, {
            method: 'GET',
            headers: {
                'x-client-id': clientId,
                'x-api-key': apiKey
            }
        });

        const data = await response.json();

        if (data.code !== '00') {
            console.error('PayOS API error:', data);
            return NextResponse.json({
                error: 'Failed to check payment status',
                details: data.desc || 'Unknown error'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            data: {
                orderCode: data.data.orderCode,
                status: data.data.status, // PENDING, PAID, CANCELLED, EXPIRED
                amount: data.data.amount,
                amountPaid: data.data.amountPaid || 0,
                amountRemaining: data.data.amountRemaining || data.data.amount
            }
        });

    } catch (error) {
        console.error('Check payment status error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
