import { db } from "@/lib/db"
import type { TranslationScope } from "@prisma/client"

export async function getTranslations(
    locale: string,
    scope?: TranslationScope | TranslationScope[]
): Promise<Record<string, string>> {
    const where: Record<string, unknown> = { languageCode: locale }
    if (scope) {
        where.scope = Array.isArray(scope) ? { in: scope } : scope
    }

    const translations = await db.staticTranslation.findMany({ where })
    const translationMap = new Map(translations.map(t => [t.key, t.value]))

    return Object.fromEntries(translationMap)
}

export async function t(key: string, locale: string, scope?: TranslationScope): Promise<string> {
    const translations = await getTranslations(locale, scope)
    return translations[key] || key
}
