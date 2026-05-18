import { db } from "@/lib/db"

export const getSupportedLocales = async () => {
    const languages = await db.language.findMany({
        where: { isActivePublic: true },
        orderBy: { isDefault: "desc" },
        select: { code: true, name: true, flag: true, isDefault: true, direction: true }
    })
    return languages
}

export const getDefaultLocale = async () => {
    const defaultLang = await db.language.findFirst({
        where: { isDefault: true },
        select: { code: true }
    })
    return defaultLang!.code
}

export const getAvailableLanguages = async (scope: "ADMIN" | "PUBLIC") => {
    const where = scope === "ADMIN" ? { isActiveAdmin: true } : { isActivePublic: true }

    const languages = await db.language.findMany({
        where,
        orderBy: { isDefault: "desc" },
        select: { code: true, name: true, flag: true }
    })

    return languages.map(lang => ({
        ...lang,
        flag: lang.flag || "🌐"
    }))
}

export const getLocaleData = async (locale: string) => {
    return db.language.findUnique({
        where: { code: locale },
        select: { code: true, name: true, flag: true, isDefault: true, direction: true, isActivePublic: true, isActiveAdmin: true }
    })
}

export function hasLocalePrefix(path: string, locales: string[]): boolean {
    return new RegExp(`^/(${locales.join("|")})(/|$)`).test(path)
}

export function getLocaleFromAcceptLanguage(
    acceptLanguage: string | null,
    supportedLocales: string[],
    defaultLocale: string
): string {
    if (!acceptLanguage) return defaultLocale

    const languages = acceptLanguage
        .split(",")
        .map((lang) => {
            const [code, priority = "q=1"] = lang.trim().split(";")
            return { code: code.split("-")[0].toLowerCase(), q: parseFloat(priority.replace("q=", "")) || 1 }
        })
        .sort((a, b) => b.q - a.q)

    for (const { code } of languages) {
        if (supportedLocales.includes(code)) return code
    }

    return defaultLocale
}
