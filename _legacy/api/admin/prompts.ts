import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import prisma from '../_lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'viralogic-admin-secret-key-2026';

// Middleware to verify admin token
function verifyAdmin(req: VercelRequest): { userId: string; email: string; role: string } | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.substring(7);
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
        if (decoded.role !== 'ADMIN') {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Verify admin
    const admin = verifyAdmin(req);
    if (!admin) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // GET - List prompts
        if (req.method === 'GET') {
            const { category, tier, isActive } = req.query;

            const prompts = await prisma.prompt.findMany({
                where: {
                    ...(category && { category: category as string }),
                    ...(tier && { tier: tier as any }),
                    ...(isActive !== undefined && { isActive: isActive === 'true' })
                },
                orderBy: [
                    { category: 'asc' },
                    { order: 'asc' },
                    { createdAt: 'desc' }
                ]
            });

            return res.status(200).json({ success: true, data: prompts });
        }

        // POST - Create prompt
        if (req.method === 'POST') {
            const { title, content, category, tier, isActive, order } = req.body;

            if (!title || !content || !category) {
                return res.status(400).json({ error: 'Title, content, and category are required' });
            }

            const prompt = await prisma.prompt.create({
                data: {
                    title,
                    content,
                    category,
                    tier: tier || 'PRO',
                    isActive: isActive !== false,
                    order: order || 0
                }
            });

            return res.status(201).json({ success: true, data: prompt });
        }

        // PUT - Update prompt
        if (req.method === 'PUT') {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Prompt ID is required' });
            }

            const prompt = await prisma.prompt.update({
                where: { id },
                data: updateData
            });

            return res.status(200).json({ success: true, data: prompt });
        }

        // DELETE - Delete prompt
        if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'Prompt ID is required' });
            }

            await prisma.prompt.delete({
                where: { id: id as string }
            });

            return res.status(200).json({ success: true, message: 'Prompt deleted' });
        }

        return res.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error('Prompts API error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
