import { db } from "@/lib/db"
import { cache } from "react"

export const getRoutesMap = cache(async () => {
    try {
        const aliases = await db.routeAlias.findMany({
            select: {
                key: true,
                path: true,
                languageCode: true,
            }
        })

        const routes: Record<string, string> = {}

        aliases.forEach(a => {
            routes[`${a.languageCode}:${a.key}`] = a.path
        })

        return routes
    } catch (error) {
        console.error("Route map fetch error:", error)
        return {}
    }
})