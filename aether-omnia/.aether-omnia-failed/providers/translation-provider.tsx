"use client"

import { createContext, useContext, useMemo } from "react"

interface TranslationContextType {
    locale: string
    translations: Record<string, string>
    t: (key: string, fallback?: string) => string
}

const TranslationContext = createContext<TranslationContextType | null>(null)

interface TranslationProviderProps {
    children: React.ReactNode
    locale: string
    translations: Record<string, string>
}

export function TranslationProvider({ children, locale, translations }: TranslationProviderProps) {
    const value = useMemo<TranslationContextType>(() => ({
        locale,
        translations,
        t: (key, fallback) => translations[key] ?? fallback ?? key,
    }), [locale, translations])

    return (
        <TranslationContext.Provider value={value}>
            {children}
        </TranslationContext.Provider>
    )
}

export function useTranslations() {
    const context = useContext(TranslationContext)
    if (!context) throw new Error("useTranslations must be used within TranslationProvider")
    return context
}

export function useT() {
    return useTranslations().t
}

export function useLocale() {
    return useTranslations().locale
}
