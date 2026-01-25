import type { VercelRequest, VercelResponse } from '@vercel/node';

const PAYOS_API_URL = 'https://api-merchant.payos.vn/v2/payment-requests';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { orderCode } = req.query;

        if (!orderCode) {
            return res.status(400).json({ error: 'Missing orderCode parameter' });
        }

        // Get credentials from environment
        const clientId = process.env.PAYOS_CLIENT_ID;
        const apiKey = process.env.PAYOS_API_KEY;

        if (!clientId || !apiKey) {
            console.error('PayOS credentials not configured');
            return res.status(500).json({ error: 'Payment service not configured' });
        }

        // Call PayOS API to check payment status
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
            return res.status(400).json({
                error: 'Failed to check payment status',
                details: data.desc || 'Unknown error'
            });
        }

        // Return payment status
        return res.status(200).json({
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
        return res.status(500).json({ error: 'Internal server error' });
    }
}
