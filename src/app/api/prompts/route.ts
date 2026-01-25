import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Tier } from '@prisma/client';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const tier = searchParams.get('tier');
        const category = searchParams.get('category');

        // Validate tier
        const validTiers = ['FREE', 'STARTER', 'PRO', 'ELITE'];
        const requestedTier = (tier as string)?.toUpperCase() || 'FREE';

        if (!validTiers.includes(requestedTier)) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        // Get tier index for filtering (higher tiers can see lower tier content)
        const tierIndex = validTiers.indexOf(requestedTier);
        const accessibleTiers = validTiers.slice(0, tierIndex + 1);

        const prompts = await prisma.prompt.findMany({
            where: {
                isActive: true,
                tier: { in: accessibleTiers as Tier[] },
                ...(category && { category })
            },
            select: {
                id: true,
                title: true,
                content: true,
                category: true,
                tier: true
            },
            orderBy: [
                { category: 'asc' },
                { order: 'asc' }
            ]
        });

        return NextResponse.json({
            success: true,
            data: prompts
        });

    } catch (error) {
        console.error('Public prompts API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
