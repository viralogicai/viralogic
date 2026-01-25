import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'viralogic-admin-secret-key-2026';

export async function verifyAdmin() {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');

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
