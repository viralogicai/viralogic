import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Tier } from '@prisma/client';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const tier = searchParams.get('tier');
        const month = searchParams.get('month');

        // Validate tier
        const validTiers = ['FREE', 'STARTER', 'PRO', 'VIP_MENTORSHIP'];
        const requestedTier = (tier as string)?.toUpperCase() || 'FREE';

        if (!validTiers.includes(requestedTier)) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        // Get tier index for filtering
        const tierIndex = validTiers.indexOf(requestedTier);
        const accessibleTiers = validTiers.slice(0, tierIndex + 1);

        // Default to current month if not specified
        const targetMonth = month || new Date().toISOString().slice(0, 7);

        const resources = await prisma.resource.findMany({
            where: {
                isActive: true,
                month: targetMonth,
                tier: { in: accessibleTiers as Tier[] }
            },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
                url: true,
                tier: true,
                month: true
            },
            orderBy: [
                { order: 'asc' }
            ]
        });

        return NextResponse.json({
            success: true,
            data: resources
        });

    } catch (error) {
        console.error('Public resources API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
