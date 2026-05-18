import { z } from "zod"

export const languageCreateSchema = z.object({
    code: z
        .string()
        .min(2, "Dil kodu en az 2 karakter olmalı.")
        .max(5, "Dil kodu en fazla 5 karakter olabilir.")
        .regex(/^[a-z]+$/, "Dil kodu sadece küçük harf içerebilir."),
    name: z
        .string()
        .min(2, "Dil adı en az 2 karakter olmalı.")
        .max(50, "Dil adı en fazla 50 karakter olabilir."),
    flag: z.string().nullable().optional(),
    direction: z.enum(["ltr", "rtl"]).default("ltr"),
    isDefault: z.boolean().default(false),
    isActivePublic: z.boolean().default(true),
    isActiveAdmin: z.boolean().default(true),
})

export const languageUpdateSchema = z.object({
    name: z
        .string()
        .min(2, "Dil adı en az 2 karakter olmalı.")
        .max(50, "Dil adı en fazla 50 karakter olabilir."),
    flag: z.string().nullable().optional(),
    direction: z.enum(["ltr", "rtl"]).default("ltr"),
    isDefault: z.boolean().default(false),
    isActivePublic: z.boolean().default(true),
    isActiveAdmin: z.boolean().default(true),
})

export type LanguageCreateInput = z.infer<typeof languageCreateSchema>
export type LanguageUpdateInput = z.infer<typeof languageUpdateSchema>
