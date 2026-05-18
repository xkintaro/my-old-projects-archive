import { z } from "zod"

const VALIDATION_MESSAGES = {
    // Login
    EMAIL_REQUIRED: "E-posta adresi gerekli",
    EMAIL_INVALID: "Geçerli bir e-posta adresi girin",
    PASSWORD_REQUIRED: "Şifre gerekli",
    PASSWORD_MIN: "Şifre en az 6 karakter olmalı",
    // Register
    USERNAME_REQUIRED: "Kullanıcı adı gerekli",
    USERNAME_MIN: "Kullanıcı adı en az 3 karakter olmalı",
    USERNAME_MAX: "Kullanıcı adı en fazla 20 karakter olabilir",
    USERNAME_INVALID: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir",
    PASSWORD_CONFIRM_REQUIRED: "Şifre tekrarı gerekli",
    PASSWORD_MISMATCH: "Şifreler eşleşmiyor",
} as const

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
        .email(VALIDATION_MESSAGES.EMAIL_INVALID)
        .transform((val) => val.toLowerCase().trim()),
    password: z
        .string()
        .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
        .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
})

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(1, VALIDATION_MESSAGES.USERNAME_REQUIRED)
            .min(3, VALIDATION_MESSAGES.USERNAME_MIN)
            .max(20, VALIDATION_MESSAGES.USERNAME_MAX)
            .regex(/^[a-zA-Z0-9_]+$/, VALIDATION_MESSAGES.USERNAME_INVALID)
            .transform((val) => val.toLowerCase().trim()),
        email: z
            .string()
            .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
            .email(VALIDATION_MESSAGES.EMAIL_INVALID)
            .transform((val) => val.toLowerCase().trim()),
        password: z
            .string()
            .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
            .min(6, VALIDATION_MESSAGES.PASSWORD_MIN),
        confirmPassword: z
            .string()
            .min(1, VALIDATION_MESSAGES.PASSWORD_CONFIRM_REQUIRED),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: VALIDATION_MESSAGES.PASSWORD_MISMATCH,
        path: ["confirmPassword"],
    })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
