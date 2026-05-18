"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { translationCreateSchema, translationUpdateSchema } from "@/lib/validations/translation"
import type { TranslationScope } from "@prisma/client"

export async function getTranslations(filters?: {
    scope?: TranslationScope
    languageCode?: string
    search?: string
}) {
    const where: Record<string, unknown> = {}

    if (filters?.scope) {
        where.scope = filters.scope
    }
    if (filters?.languageCode) {
        where.languageCode = filters.languageCode
    }
    if (filters?.search) {
        where.OR = [
            { key: { contains: filters.search, mode: "insensitive" } },
            { value: { contains: filters.search, mode: "insensitive" } },
        ]
    }

    const translations = await db.staticTranslation.findMany({
        where,
        orderBy: [
            { key: "asc" },
            { languageCode: "asc" }
        ],
        include: {
            language: {
                select: { name: true, flag: true }
            }
        }
    })
    return { success: true, data: translations }
}

export async function getTranslationsGroupedByKey(filters?: {
    scope?: TranslationScope
    search?: string
}) {
    const where: Record<string, unknown> = {}

    if (filters?.scope) {
        where.scope = filters.scope
    }
    if (filters?.search) {
        where.OR = [
            { key: { contains: filters.search, mode: "insensitive" } },
            { value: { contains: filters.search, mode: "insensitive" } },
        ]
    }

    const translations = await db.staticTranslation.findMany({
        where,
        orderBy: [
            { key: "asc" },
            { languageCode: "asc" }
        ],
        include: {
            language: {
                select: { code: true, name: true, flag: true }
            }
        }
    })

    const grouped = translations.reduce((acc, t) => {
        if (!acc[t.key]) {
            acc[t.key] = {
                key: t.key,
                scope: t.scope,
                translations: []
            }
        }
        acc[t.key].translations.push({
            id: t.id,
            languageCode: t.languageCode,
            languageName: t.language.name,
            languageFlag: t.language.flag,
            value: t.value,
        })
        return acc
    }, {} as Record<string, { key: string; scope: TranslationScope; translations: Array<{ id: string; languageCode: string; languageName: string; languageFlag: string | null; value: string }> }>)

    return { success: true, data: Object.values(grouped) }
}

export async function getTranslationById(id: string) {
    const translation = await db.staticTranslation.findUnique({
        where: { id },
        include: {
            language: {
                select: { name: true, flag: true }
            }
        }
    })
    if (!translation) {
        return { success: false, error: "Çeviri bulunamadı." }
    }
    return { success: true, data: translation }
}

export async function createTranslation(formData: FormData) {
    const rawData = {
        key: formData.get("key") as string,
        value: formData.get("value") as string,
        languageCode: formData.get("languageCode") as string,
        scope: formData.get("scope") as TranslationScope,
    }

    const validated = translationCreateSchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, error: (validated.error as any).errors[0].message }
    }

    const translation = await db.staticTranslation.create({
        data: validated.data
    })

    revalidatePath("/admin/translations")
    return { success: true, data: translation }
}

export async function createBulkTranslation(formData: FormData) {
    const key = formData.get("key") as string
    const scope = formData.get("scope") as TranslationScope

    const languages = await db.language.findMany()

    const createdTranslations = []
    for (const lang of languages) {
        const value = formData.get(`value_${lang.code}`) as string
        if (value && value.trim()) {
            const translation = await db.staticTranslation.upsert({
                where: {
                    key_languageCode_scope: { key, languageCode: lang.code, scope }
                },
                update: { value },
                create: { key, value, languageCode: lang.code, scope }
            })
            createdTranslations.push(translation)
        }
    }

    revalidatePath("/admin/translations")
    return { success: true, data: createdTranslations }
}

export async function updateTranslation(id: string, formData: FormData) {
    const rawData = {
        value: formData.get("value") as string,
        scope: formData.get("scope") as TranslationScope,
    }

    const validated = translationUpdateSchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, error: (validated.error as any).errors[0].message }
    }

    const translation = await db.staticTranslation.update({
        where: { id },
        data: validated.data
    })

    revalidatePath("/admin/translations")
    revalidatePath(`/admin/translations/${id}/edit`)
    return { success: true, data: translation }
}

export async function deleteTranslation(id: string) {
    await db.staticTranslation.delete({ where: { id } })
    revalidatePath("/admin/translations")
    return { success: true }
}

export async function deleteTranslationsByKey(key: string) {
    await db.staticTranslation.deleteMany({ where: { key } })
    revalidatePath("/admin/translations")
    return { success: true }
}

export async function getTranslationByKeyAndLang(key: string, languageCode: string, scope?: TranslationScope) {
    try {
        const where: Record<string, unknown> = { key, languageCode }
        if (scope) where.scope = scope

        const translation = await db.staticTranslation.findFirst({ where })
        return translation?.value || key
    } catch {
        return key
    }
}
