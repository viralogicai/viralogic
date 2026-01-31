import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'viralogic-admin-secret-key-2026';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'Email invalid or package not active' }, { status: 404 });
        }

        // Check if VIP or Admin
        const hasAccess = user.tier === 'VIP_MENTORSHIP' || user.role === 'ADMIN';

        if (!hasAccess) {
            return NextResponse.json({ error: 'Your account does not have VIP Mentorship access.' }, { status: 403 });
        }

        // Check for Pending Setup
        if (user.password.startsWith('$2b$10$PLACEHOLDER')) {
            return NextResponse.json({ status: 'SETUP_REQUIRED', message: 'Please set a password' });
        }

        // Normal Login
        if (password) {
            if (user.password !== password) {
                return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email, role: user.role, tier: user.tier },
                JWT_SECRET,
                { expiresIn: '30d' }
            );

            return NextResponse.json({
                success: true,
                status: 'SUCCESS',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        tier: user.tier
                    }
                }
            });
        }

        // If just checking email existence (step 1)
        return NextResponse.json({ status: 'PASSWORD_REQUIRED', message: 'Enter password' });

    } catch (error) {
        console.error('Member login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
