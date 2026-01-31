import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'viralogic-admin-secret-key-2026';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, newPassword } = body;

        if (!email || !newPassword) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Only allow setup if password is still placeholder
        if (!user.password.startsWith('$2b$10$PLACEHOLDER')) {
            return NextResponse.json({ error: 'Account already has a password set. Log in instead.' }, { status: 400 });
        }

        // Update password
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { password: newPassword }
        });

        // Auto-login after setup
        const token = jwt.sign(
            { userId: updatedUser.id, email: updatedUser.email, role: updatedUser.role, tier: updatedUser.tier },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return NextResponse.json({
            success: true,
            data: {
                token,
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role,
                    tier: updatedUser.tier
                }
            }
        });

    } catch (error) {
        console.error('Password setup error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
