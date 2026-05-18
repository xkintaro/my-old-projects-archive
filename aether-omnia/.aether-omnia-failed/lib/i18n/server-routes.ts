import { getRoutesMap } from "@/lib/i18n/get-routes"
import { RouteKey } from "@/lib/routes"

export async function getRoute(key: RouteKey, locale: string) {
    const routes = await getRoutesMap()

    const lookupKey = `${locale}:${key}`
    const path = routes[lookupKey]

    return path || `/${key}`
}

export async function getFullRoute(key: RouteKey, locale: string) {
    const path = await getRoute(key, locale)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/${locale}${path}`
}