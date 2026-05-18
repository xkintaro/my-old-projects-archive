'use server';

import { db } from '@/lib/db';
import { registerSchema, type RegisterInput } from '@/lib/auth/schemas';
import { hashPassword } from '@/lib/auth/utils';

export type RegisterResult = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function registerAction(data: RegisterInput): Promise<RegisterResult> {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
        return {
            success: false,
            message: 'Geçersiz form verileri',
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const { username, email, password } = validated.data;

    try {
        const existingEmail = await db.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (existingEmail) {
            return {
                success: false,
                message: 'Bu e-posta adresi zaten kullanılıyor',
                errors: { email: ['Bu e-posta adresi zaten kullanılıyor'] },
            };
        }

        const existingUsername = await db.user.findUnique({
            where: { username },
            select: { id: true },
        });

        if (existingUsername) {
            return {
                success: false,
                message: 'Bu kullanıcı adı zaten kullanılıyor',
                errors: { username: ['Bu kullanıcı adı zaten kullanılıyor'] },
            };
        }

        const userRole = await db.role.findUnique({
            where: { code: 'user' },
            select: { id: true },
        });

        if (!userRole) {
            console.error('[Register] Default USER role not found');
            return {
                success: false,
                message: 'Sistem hatası. Lütfen daha sonra tekrar deneyin.',
            };
        }

        const hashedPassword = await hashPassword(password);

        await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                roleId: userRole.id,
            },
        });

        return {
            success: true,
            message: 'Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.',
        };

    } catch (error) {
        console.error('[Register] Error:', error);
        return {
            success: false,
            message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        };
    }
}
