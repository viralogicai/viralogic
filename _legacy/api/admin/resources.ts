import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import prisma from '../_lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'viralogic-admin-secret-key-2026';

function verifyAdmin(req: VercelRequest): boolean {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
        return decoded.role === 'ADMIN';
    } catch {
        return false;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!verifyAdmin(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // GET - List resources
        if (req.method === 'GET') {
            const { month, tier, type } = req.query;

            const resources = await prisma.resource.findMany({
                where: {
                    ...(month && { month: month as string }),
                    ...(tier && { tier: tier as any }),
                    ...(type && { type: type as string })
                },
                orderBy: [
                    { month: 'desc' },
                    { order: 'asc' },
                    { createdAt: 'desc' }
                ]
            });

            return res.status(200).json({ success: true, data: resources });
        }

        // POST - Create resource
        if (req.method === 'POST') {
            const { month, title, description, type, url, tier, isActive, order } = req.body;

            if (!month || !title || !type || !url) {
                return res.status(400).json({ error: 'Month, title, type, and url are required' });
            }

            const resource = await prisma.resource.create({
                data: {
                    month,
                    title,
                    description,
                    type,
                    url,
                    tier: tier || 'PRO',
                    isActive: isActive !== false,
                    order: order || 0
                }
            });

            return res.status(201).json({ success: true, data: resource });
        }

        // PUT - Update resource
        if (req.method === 'PUT') {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Resource ID is required' });
            }

            const resource = await prisma.resource.update({
                where: { id },
                data: updateData
            });

            return res.status(200).json({ success: true, data: resource });
        }

        // DELETE - Delete resource
        if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'Resource ID is required' });
            }

            await prisma.resource.delete({
                where: { id: id as string }
            });

            return res.status(200).json({ success: true, message: 'Resource deleted' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Resources API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
