import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './lib/prisma';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { tier, category } = req.query;

        // Validate tier
        const validTiers = ['FREE', 'STARTER', 'PRO', 'ELITE'];
        const requestedTier = (tier as string)?.toUpperCase() || 'FREE';

        if (!validTiers.includes(requestedTier)) {
            return res.status(400).json({ error: 'Invalid tier' });
        }

        // Get tier index for filtering (higher tiers can see lower tier content)
        const tierIndex = validTiers.indexOf(requestedTier);
        const accessibleTiers = validTiers.slice(0, tierIndex + 1);

        const prompts = await prisma.prompt.findMany({
            where: {
                isActive: true,
                tier: { in: accessibleTiers as any[] },
                ...(category && { category: category as string })
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

        return res.status(200).json({
            success: true,
            data: prompts
        });

    } catch (error) {
        console.error('Public prompts API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
