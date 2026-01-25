import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import { Tier } from '@prisma/client';

export async function GET(request: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month');
        const tier = searchParams.get('tier');
        const type = searchParams.get('type');

        const resources = await prisma.resource.findMany({
            where: {
                ...(month && { month }),
                ...(tier && { tier: tier as Tier }),
                ...(type && { type })
            },
            orderBy: [
                { month: 'desc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ success: true, data: resources });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { month, title, description, type, url, tier, isActive, order } = body;

        if (!month || !title || !type || !url) {
            return NextResponse.json({ error: 'Month, title, type, and url are required' }, { status: 400 });
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

        return NextResponse.json({ success: true, data: resource }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 });
        }

        const resource = await prisma.resource.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({ success: true, data: resource });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 });
        }

        await prisma.resource.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: 'Resource deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
