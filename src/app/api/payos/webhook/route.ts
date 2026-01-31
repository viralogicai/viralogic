import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { syncCustomerToGetResponse } from '@/lib/getresponse';

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

            // Update database and sync to GetResponse
            try {
                const payment = await prisma.payment.findUnique({
                    where: { orderCode: String(orderCode) }
                });

                if (payment) {
                    await prisma.payment.update({
                        where: { id: payment.id },
                        data: {
                            status: 'PAID',
                            updatedAt: new Date()
                        }
                    });

                    // Handle VIP Membership User Creation
                    const isVip = payment.planId.toLowerCase().includes('vip') || payment.planId.toLowerCase().includes('mentorship');
                    const buyerEmail = (payment.paymentData as any)?.buyerEmail; // Use safe access

                    if (isVip && buyerEmail) {
                        try {
                            // Upsert User: Create if new, Update tier if exists
                            // Note: Password for new user is set to a placeholder that prevents login until setup
                            // In a real app, generate a token for password setup email.
                            await prisma.user.upsert({
                                where: { email: buyerEmail },
                                update: {
                                    tier: 'VIP_MENTORSHIP',
                                    role: 'USER' // Keep role as user, tier determines access
                                },
                                create: {
                                    email: buyerEmail,
                                    name: buyerEmail.split('@')[0],
                                    password: '$2b$10$PLACEHOLDER_PENDING_SETUP', // Invalid hash to prevent login
                                    tier: 'VIP_MENTORSHIP',
                                    role: 'USER'
                                }
                            });
                            console.log(`[Webhook] Upserted VIP User: ${buyerEmail}`);
                        } catch (err) {
                            console.error(`[Webhook] Failed to upsert user ${buyerEmail}:`, err);
                        }
                    }

                    // Sync to GetResponse
                    const paymentData = payment.paymentData as { buyerEmail?: string } | null;
                    if (paymentData?.buyerEmail) {
                        await syncCustomerToGetResponse(
                            paymentData.buyerEmail,
                            payment.planId,
                            'Customer' // We might want to pass real name if available
                        );
                    } else {
                        console.warn(`[Webhook] No buyer email found for order ${orderCode}, skipping GetResponse sync`);
                    }
                } else {
                    console.error(`[Webhook] Payment record not found for order ${orderCode}`);
                }
            } catch (dbError) {
                console.error('[Webhook] Database/Sync error:', dbError);
                // Continue to return success to PayOS so they don't retry indefinitely for a logic error
            }
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
