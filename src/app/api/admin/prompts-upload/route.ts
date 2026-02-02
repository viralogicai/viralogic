
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';
import * as XLSX from 'xlsx';



export async function POST(request: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { fileData } = body;

        if (!fileData) {
            return NextResponse.json({ error: 'No file data provided' }, { status: 400 });
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(fileData, 'base64');
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Parse to JSON
        const rows = XLSX.utils.sheet_to_json(sheet);
        console.log(`Parsed ${rows.length} rows from Excel`);

        let successCount = 0;
        let failedCount = 0;
        const errors: string[] = [];

        // DB Transaction for better performance if many rows, but let's do loop for error reporting per row
        // Or massive createMany if possible? createMany doesn't report individual errors nicely.
        // Let's loop.

        for (let i = 0; i < rows.length; i++) {
            const row: any = rows[i];

            // Map columns:
            // "Prompt Category" -> category
            // "Prompt Title" -> title
            // "Complete Prompt" -> content
            // "What the Prompt Does" -> Append to content? Or ignore?
            // "Tier" -> Optional, default PRO. 

            // Check keys roughly (trim spaces)
            const cleanRow: any = {};
            Object.keys(row).forEach(k => {
                cleanRow[k.trim()] = row[k];
            });

            const title = cleanRow['Prompt Title'] || cleanRow['Title'];
            const content = cleanRow['Complete Prompt'] || cleanRow['Content'] || cleanRow['Prompt'];
            const category = cleanRow['Prompt Category'] || cleanRow['Category'];
            // Optional: What the prompt does. Maybe prepend to content as description?
            const desc = cleanRow['What the Prompt Does'];
            const tierStr = cleanRow['Tier'] || 'PRO';

            // Validate
            if (!title || !content || !category) {
                failedCount++;
                errors.push(`Row ${i + 2}: Missing required fields (Title, Content, Category)`);
                continue;
            }

            // Combine desc if exists
            let finalContent = content;
            if (desc) {
                finalContent = `**Description:** ${desc}\n\n${content}`;
            }

            // Normalize Tier
            let tier = 'VIP_MENTORSHIP';
            const t = tierStr.toString().trim().toUpperCase();
            if (['FREE', 'STARTER', 'PRO', 'VIP_MENTORSHIP'].includes(t)) {
                tier = t;
            }

            try {
                // Upsert based on Title? Or just create?
                // Let's just create to allow duplicates if intended, or maybe title should be unique?
                // Schema has id @id, no unique constraint on title.
                await prisma.prompt.create({
                    data: {
                        title: title.toString(),
                        content: finalContent.toString(),
                        category: category.toString(),
                        tier: tier as any,
                        isActive: true,
                        order: 0 // Default order
                    }
                });
                successCount++;
            } catch (err) {
                console.error('Row insert error:', err);
                failedCount++;
                errors.push(`Row ${i + 2}: Database error - ${(err as Error).message}`);
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                success: successCount,
                failed: failedCount,
                errors: errors.slice(0, 20) // Limit errors returned
            }
        });

    } catch (error) {
        console.error('Upload handler error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
}
