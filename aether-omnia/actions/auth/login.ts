'use server';

import { signIn } from '@/lib/auth';
import { loginSchema, type LoginInput } from '@/lib/auth/schemas';
import { AuthError } from 'next-auth';

export type LoginResult = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function loginAction(data: LoginInput): Promise<LoginResult> {
    const validated = loginSchema.safeParse(data);

    if (!validated.success) {
        return {
            success: false,
            message: 'Geçersiz form verileri',
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    const { email, password } = validated.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return {
            success: true,
            message: 'Giriş başarılı',
        };

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        success: false,
                        message: 'E-posta veya parola hatalı',
                    };
                default:
                    return {
                        success: false,
                        message: 'Giriş yapılamadı. Lütfen tekrar deneyin.',
                    };
            }
        }

        throw error;
    }
}
