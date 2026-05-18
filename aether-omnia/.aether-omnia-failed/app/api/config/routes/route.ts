import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("x-internal-secret")

        if (authHeader !== process.env.AETHER_INTERNAL_SECRET) {
             return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
         }

        const aliases = await db.routeAlias.findMany({
            select: { key: true, sourcePath: true, path: true, languageCode: true }
        })

        const rewrites: Record<string, string> = {}
        const routes: Record<string, string> = {}
        const reverseMap: Record<string, string> = {}

        aliases.forEach(a => {
            rewrites[`${a.languageCode}:${a.path}`] = a.sourcePath
            routes[`${a.languageCode}:${a.key}`] = a.path

            reverseMap[a.path] = a.key
            reverseMap[a.sourcePath] = a.key
        })

        return NextResponse.json({ rewrites, routes, reverseMap })

    } catch (error) {
        return NextResponse.json({ error: "Database error" }, { status: 500 })
    }
}