"use client"

import { createContext, useContext } from "react"
import { RouteKey } from "@/lib/routes"

interface RouteContextType {
    routes: Record<string, string>
    locale: string
}

const RouteContext = createContext<RouteContextType | null>(null)
export function RouteProvider({
    children,
    routes,
    locale
}: {
    children: React.ReactNode,
    routes: Record<string, string>,
    locale: string
}) {
    return (
        <RouteContext.Provider value={{ routes, locale }}>
            {children}
        </RouteContext.Provider>
    )
}

export function useRoute() {
    const context = useContext(RouteContext)

    if (!context) {
        throw new Error("useRoute must be used within a RouteProvider")
    }

    const { routes, locale } = context

    const alias = (key: RouteKey) => {
        const lookupKey = `${locale}:${key}`
        const translatedPath = routes[lookupKey]

        return translatedPath || `/${key}`
    }

    const getLink = (key: RouteKey, params?: Record<string, string>) => {
        const lookupKey = `${locale}:${key}`
        let path = routes[lookupKey] || `/${key}`

        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                path = path.replace(`[${k}]`, v)
            })
        }

        const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
        return `${origin}/${locale}${path}`
    }

    return { alias, getLink, locale }
}