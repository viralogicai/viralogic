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
        const category = searchParams.get('category');
        const tier = searchParams.get('tier');
        const isActive = searchParams.get('isActive');

        const prompts = await prisma.prompt.findMany({
            where: {
                ...(category && { category }),
                ...(tier && { tier: tier as Tier }),
                ...(isActive !== null && { isActive: isActive === 'true' })
            },
            orderBy: [
                { category: 'asc' },
                { order: 'asc' },
                { createdAt: 'desc' }
            ]
        });

        return NextResponse.json({ success: true, data: prompts });
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
        const { title, content, category, tier, isActive, order } = body;

        if (!title || !content || !category) {
            return NextResponse.json({ error: 'Title, content, and category are required' }, { status: 400 });
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

        return NextResponse.json({ success: true, data: prompt }, { status: 201 });
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
            return NextResponse.json({ error: 'Prompt ID is required' }, { status: 400 });
        }

        const prompt = await prisma.prompt.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json({ success: true, data: prompt });
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
            return NextResponse.json({ error: 'Prompt ID is required' }, { status: 400 });
        }

        await prisma.prompt.delete({
            where: { id }
        });

        return NextResponse.json({ success: true, message: 'Prompt deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
