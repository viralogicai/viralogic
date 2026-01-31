import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './_lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { tier, month } = req.query;

        // Validate tier
        const validTiers = ['FREE', 'STARTER', 'PRO', 'ELITE'];
        const requestedTier = (tier as string)?.toUpperCase() || 'FREE';

        if (!validTiers.includes(requestedTier)) {
            return res.status(400).json({ error: 'Invalid tier' });
        }

        // Get tier index for filtering
        const tierIndex = validTiers.indexOf(requestedTier);
        const accessibleTiers = validTiers.slice(0, tierIndex + 1);

        // Default to current month if not specified
        const targetMonth = (month as string) || new Date().toISOString().slice(0, 7);

        const resources = await prisma.resource.findMany({
            where: {
                isActive: true,
                month: targetMonth,
                tier: { in: accessibleTiers as any[] }
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

        return res.status(200).json({
            success: true,
            data: resources
        });

    } catch (error) {
        console.error('Public resources API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
