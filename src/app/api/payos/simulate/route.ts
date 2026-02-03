import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { syncCustomerToMailerLite } from '@/lib/mailerlite';

export async function POST(request: Request) {
    if (process.env.NODE_ENV === 'production') {
        // Optional: block in production if you strictly want to prevent simulation
        // return NextResponse.json({ error: 'Simulation not allowed in production' }, { status: 403 });
        // However, user might want to test in prod too? For now I'll leave it open or log a warning.
        console.warn('⚠️ Simulating payment in PRODUCTION environment');
    }

    try {
        const body = await request.json();
        const { orderCode } = body;

        if (!orderCode) {
            return NextResponse.json({ error: 'Order code is required' }, { status: 400 });
        }

        console.log(`[Simulate] Processing simulation for order ${orderCode}`);

        const payment = await prisma.payment.findUnique({
            where: { orderCode: String(orderCode) }
        });

        if (!payment) {
            return NextResponse.json({ error: 'Payment record not found' }, { status: 404 });
        }

        // Update to PAID
        await prisma.payment.update({
            where: { id: payment.id },
            data: {
                status: 'PAID',
                updatedAt: new Date()
            }
        });

        // Handle VIP Membership User Creation
        const isVip = payment.planId.toLowerCase().includes('vip') || payment.planId.toLowerCase().includes('mentorship');
        const buyerEmail = (payment.paymentData as any)?.buyerEmail;

        console.log(`[Simulate] planId: "${payment.planId}", isVip: ${isVip}, buyerEmail: ${buyerEmail || 'MISSING'}`);

        if (isVip && buyerEmail) {
            try {
                const upsertedUser = await prisma.user.upsert({
                    where: { email: buyerEmail },
                    update: {
                        tier: 'VIP_MENTORSHIP',
                        role: 'USER'
                    },
                    create: {
                        email: buyerEmail,
                        name: buyerEmail.split('@')[0],
                        password: '$2b$10$PLACEHOLDER_PENDING_SETUP',
                        tier: 'VIP_MENTORSHIP',
                        role: 'USER'
                    }
                });
                console.log(`[Simulate] Upserted VIP User: ${buyerEmail}, userId: ${upsertedUser.id}`);
            } catch (err) {
                console.error(`[Simulate] Failed to upsert user ${buyerEmail}:`, err);
            }
        } else if (!isVip) {
            console.log(`[Simulate] Skipping user creation - not a VIP plan`);
        } else if (!buyerEmail) {
            console.warn(`[Simulate] Cannot create user - buyerEmail is missing from paymentData`);
        }

        // Sync to MailerLite
        let syncResult = null;
        const paymentData = payment.paymentData as { buyerEmail?: string } | null;

        if (paymentData?.buyerEmail) {
            try {
                syncResult = await syncCustomerToMailerLite(
                    paymentData.buyerEmail,
                    payment.planId,
                    'Simulated Customer'
                );
                if (syncResult) {
                    console.log(`[Simulate] Synced ${paymentData.buyerEmail} to MailerLite`);
                } else {
                    console.warn(`[Simulate] Failed to sync ${paymentData.buyerEmail} to MailerLite (check logs)`);
                }
            } catch (err) {
                console.error('[Simulate] MailerLite sync failed:', err);
                // We don't fail the request if sync fails, but we report it
            }
        } else {
            console.warn(`[Simulate] No buyer email found for order ${orderCode}`);
        }

        return NextResponse.json({
            success: true,
            message: 'Payment simulated and processed successfully',
            syncResult
        });

    } catch (error) {
        console.error('[Simulate] Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
