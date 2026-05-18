import { z } from "zod"
import { TranslationScope } from "@prisma/client"

export const translationCreateSchema = z.object({
    key: z
        .string()
        .min(3, "Anahtar en az 3 karakter olmalı.")
        .max(100, "Anahtar en fazla 100 karakter olabilir.")
        .regex(/^[a-z0-9_.]+$/, "Anahtar sadece küçük harf, rakam, alt çizgi ve nokta içerebilir."),
    value: z
        .string()
        .min(1, "Değer boş olamaz.")
        .max(1000, "Değer en fazla 1000 karakter olabilir."),
    languageCode: z
        .string()
        .min(2, "Dil kodu gerekli."),
    scope: z.nativeEnum(TranslationScope),
})

export const translationUpdateSchema = z.object({
    value: z
        .string()
        .min(1, "Değer boş olamaz.")
        .max(1000, "Değer en fazla 1000 karakter olabilir."),
    scope: z.nativeEnum(TranslationScope),
})

export const translationBulkSchema = z.object({
    key: z
        .string()
        .min(3, "Anahtar en az 3 karakter olmalı.")
        .max(100, "Anahtar en fazla 100 karakter olabilir.")
        .regex(/^[a-z0-9_.]+$/, "Anahtar sadece küçük harf, rakam, alt çizgi ve nokta içerebilir."),
    scope: z.nativeEnum(TranslationScope),
})

export type TranslationCreateInput = z.infer<typeof translationCreateSchema>
export type TranslationUpdateInput = z.infer<typeof translationUpdateSchema>
export type TranslationBulkInput = z.infer<typeof translationBulkSchema>
