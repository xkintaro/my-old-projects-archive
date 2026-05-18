import { z } from 'zod';

// -----------------------------------------------------------------------------
// 1. LOGIN SCHEMA
// -----------------------------------------------------------------------------

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'E-posta adresi gerekli')
        .email('Geçerli bir e-posta adresi girin'),
    password: z
        .string()
        .min(1, 'Parola gerekli')
        .min(6, 'Parola en az 6 karakter olmalı'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// -----------------------------------------------------------------------------
// 2. REGISTER SCHEMA
// -----------------------------------------------------------------------------

export const registerSchema = z.object({
    username: z
        .string()
        .min(1, 'Kullanıcı adı gerekli')
        .min(3, 'Kullanıcı adı en az 3 karakter olmalı')
        .max(20, 'Kullanıcı adı en fazla 20 karakter olabilir')
        .regex(/^[a-zA-Z0-9_]+$/, 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir'),
    email: z
        .string()
        .min(1, 'E-posta adresi gerekli')
        .email('Geçerli bir e-posta adresi girin'),
    password: z
        .string()
        .min(1, 'Parola gerekli')
        .min(6, 'Parola en az 6 karakter olmalı'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// -----------------------------------------------------------------------------
// 3. PROFILE UPDATE SCHEMA
// -----------------------------------------------------------------------------

export const profileUpdateSchema = z.object({
    name: z.string().max(50).optional(),
    surname: z.string().max(50).optional(),
    description: z.string().max(500).optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
