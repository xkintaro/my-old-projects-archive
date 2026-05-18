import 'server-only';
import { hash, compare } from 'bcryptjs';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

const SALT_ROUNDS = parseInt(process.env.AUTH_SALT_ROUNDS || '12', 10);

// -----------------------------------------------------------------------------
// 1. PASSWORD UTILITIES
// -----------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
}

// -----------------------------------------------------------------------------
// 2. SESSION HELPERS
// -----------------------------------------------------------------------------

export async function getCurrentUser() {
    const session = await auth();

    if (!session?.user?.id) {
        return null;
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            username: true,
            email: true,
            name: true,
            surname: true,
            avatar: true,
            description: true,
            role: {
                select: {
                    id: true,
                    name: true,
                    code: true,
                    type: true,
                }
            },
            createdAt: true,
        }
    });

    return user;
}

export async function requireAuth() {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    return user;
}
