import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is missing from environment variables');
    process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    // const hashedPassword = await bcrypt.hash('admin123456', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@viralogic.ai' },
        update: {
            password: 'admin123456', // Update to plain text if exists
        },
        create: {
            email: 'admin@viralogic.ai',
            password: 'admin123456', // Store plain text

            name: 'Admin',
            role: 'ADMIN',
            tier: 'VIP_MENTORSHIP',
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create sample prompts
    const prompts = [
        {
            title: 'Hook Viral - Gây tò mò',
            content: 'Bạn có biết tại sao 90% người không bao giờ...',
            category: 'Hook',
            tier: 'STARTER' as const,
        },
        {
            title: 'Script Storytelling 30s',
            content: 'Cấu trúc: Hook (3s) → Problem (5s) → Solution (10s) → CTA (5s)...',
            category: 'Script',
            tier: 'PRO' as const,
        },
        {
            title: 'CTA chuyển đổi cao',
            content: 'Đừng bỏ lỡ! Link trong bio để nhận...',
            category: 'CTA',
            tier: 'PRO' as const,
        },
    ];

    for (const prompt of prompts) {
        await prisma.prompt.upsert({
            where: { id: prompt.title.toLowerCase().replace(/ /g, '-') },
            update: prompt,
            create: prompt,
        });
    }

    console.log('✅ Created sample prompts');

    // Create sample resources
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-01"

    const resources = [
        {
            month: currentMonth,
            title: 'Video hướng dẫn Hook Viral',
            description: 'Video chi tiết cách viết hook giữ chân người xem',
            type: 'video',
            url: 'https://example.com/video1',
            tier: 'STARTER' as const,
        },
        {
            month: currentMonth,
            title: 'Template Script 30 ngày',
            description: 'File Excel chứa 30 script mẫu',
            type: 'excel',
            url: 'https://example.com/template.xlsx',
            tier: 'PRO' as const,
        },
    ];

    for (const resource of resources) {
        await prisma.resource.create({
            data: resource,
        });
    }

    console.log('✅ Created sample resources');

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
