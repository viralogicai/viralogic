import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import * as XLSX from 'xlsx';
import prisma from '../lib/prisma';

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

interface ExcelPromptRow {
    title: string;
    content: string;
    category: string;
    tier?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!verifyAdmin(req)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { fileData, fileName } = req.body;

        if (!fileData) {
            return res.status(400).json({ error: 'File data is required' });
        }

        // Parse base64 file data
        const buffer = Buffer.from(fileData, 'base64');
        const workbook = XLSX.read(buffer, { type: 'buffer' });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const rows = XLSX.utils.sheet_to_json<ExcelPromptRow>(sheet);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'No data found in Excel file' });
        }

        // Validate and insert prompts
        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[]
        };

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Validate required fields
            if (!row.title || !row.content || !row.category) {
                results.failed++;
                results.errors.push(`Row ${i + 2}: Missing required fields (title, content, category)`);
                continue;
            }

            // Validate tier if provided
            const validTiers = ['FREE', 'STARTER', 'PRO', 'ELITE'];
            const tier = row.tier?.toUpperCase() || 'PRO';
            if (!validTiers.includes(tier)) {
                results.failed++;
                results.errors.push(`Row ${i + 2}: Invalid tier "${row.tier}". Must be one of: ${validTiers.join(', ')}`);
                continue;
            }

            try {
                await prisma.prompt.create({
                    data: {
                        title: row.title,
                        content: row.content,
                        category: row.category,
                        tier: tier as any,
                        isActive: true,
                        order: i
                    }
                });
                results.success++;
            } catch (error) {
                results.failed++;
                results.errors.push(`Row ${i + 2}: Database error`);
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                totalRows: rows.length,
                imported: results.success,
                failed: results.failed,
                errors: results.errors.slice(0, 10) // Limit errors shown
            }
        });

    } catch (error) {
        console.error('Excel upload error:', error);
        return res.status(500).json({ error: 'Failed to process Excel file' });
    }
}
