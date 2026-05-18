import { NextResponse, NextRequest } from "next/server"
import { db } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("x-internal-secret")

        if (authHeader !== process.env.AETHER_INTERNAL_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const languages = await db.language.findMany({
            where: { isActivePublic: true },
            orderBy: { isDefault: "desc" },
            select: { code: true, name: true, flag: true, direction: true, isDefault: true }
        })

        const defaultLang = languages.find(l => l.isDefault)

        if (!defaultLang) {
            return NextResponse.json(
                { error: "No default language found in database!" },
                { status: 500 }
            )
        }

        return NextResponse.json({
            locales: languages.map(l => l.code),
            defaultLocale: defaultLang.code,
            localeData: Object.fromEntries(
                languages.map(l => [l.code, { name: l.name, flag: l.flag, direction: l.direction }])
            )
        })

    } catch (error) {
        console.error("❌ API Locale Error:", error)
        return NextResponse.json(
            { error: "Database connection failed" },
            { status: 500 }
        )
    }
}