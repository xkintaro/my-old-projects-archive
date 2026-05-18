"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { languageCreateSchema, languageUpdateSchema } from "@/lib/validations/language"
import type { Language } from "@prisma/client"

export async function getLanguages() {
    const languages = await db.language.findMany({
        orderBy: [
            { isDefault: "desc" },
            { code: "asc" }
        ],
        include: {
            _count: {
                select: { staticTranslations: true }
            }
        }
    })
    return { success: true, data: languages }
}

export async function getLanguageByCode(code: string) {
    const language = await db.language.findUnique({
        where: { code },
        include: {
            _count: {
                select: { staticTranslations: true }
            }
        }
    })
    if (!language) {
        return { success: false, error: "Dil bulunamadı." }
    }
    return { success: true, data: language }
}

export async function createLanguage(formData: FormData) {
    const rawData = {
        code: formData.get("code") as string,
        name: formData.get("name") as string,
        flag: formData.get("flag") as string || null,
        direction: formData.get("direction") as string || "ltr",
        isDefault: formData.get("isDefault") === "true",
        isActivePublic: formData.get("isActivePublic") === "true",
        isActiveAdmin: formData.get("isActiveAdmin") === "true",
    }

    const validated = languageCreateSchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, error: (validated.error as any).errors[0].message }
    }

    if (validated.data.isDefault) {
        await db.language.updateMany({
            where: { isDefault: true },
            data: { isDefault: false }
        })
    }

    const language = await db.language.create({
        data: validated.data
    })

    revalidatePath("/", "layout")
    revalidatePath("/admin/languages")

    return { success: true, data: language }
}

export async function updateLanguage(code: string, formData: FormData) {
    const rawData = {
        name: formData.get("name") as string,
        flag: formData.get("flag") as string || null,
        direction: formData.get("direction") as string || "ltr",
        isDefault: formData.get("isDefault") === "true",
        isActivePublic: formData.get("isActivePublic") === "true",
        isActiveAdmin: formData.get("isActiveAdmin") === "true",
    }

    const validated = languageUpdateSchema.safeParse(rawData)
    if (!validated.success) {
        return { success: false, error: (validated.error as any).errors[0].message }
    }

    if (validated.data.isDefault) {
        await db.language.updateMany({
            where: { isDefault: true, NOT: { code } },
            data: { isDefault: false }
        })
    }

    const language = await db.language.update({
        where: { code },
        data: validated.data
    })

    revalidatePath("/", "layout")
    revalidatePath("/admin/languages")
    revalidatePath(`/admin/languages/${code}/edit`)

    return { success: true, data: language }
}

export async function deleteLanguage(code: string) {
    const language = await db.language.findUnique({ where: { code } })
    if (language?.isDefault) {
        return { success: false, error: "Varsayılan dil silinemez." }
    }

    await db.language.delete({ where: { code } })

    revalidatePath("/", "layout")
    revalidatePath("/admin/languages")

    return { success: true }
}

export async function getActiveLanguages(scope: "public" | "admin" = "public") {
    const languages = await db.language.findMany({
        where: scope === "admin" ? { isActiveAdmin: true } : { isActivePublic: true },
        orderBy: [
            { isDefault: "desc" },
            { name: "asc" }
        ]
    })
    return { success: true, data: languages }
}

export async function getDefaultLanguage(): Promise<Language | null> {
    const language = await db.language.findFirst({
        where: { isDefault: true }
    })
    return language
}
