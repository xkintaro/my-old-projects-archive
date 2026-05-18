import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const LOCALE_COOKIE = "NEXT_LOCALE"
const EXCLUDED_PATHS = ["/api", "/_next", "/favicon.ico"]
const STATIC_FILE_REGEX = /\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|mp4|webm|mp3|wav|pdf|css|js)$/i

const GUEST_ONLY_ROUTES = ["login", "register", "forgot_password"]
const ADMIN_PREFIX = "/admin"
const PROFILE_KEY = "profile"

const INTERNAL_SECRET = process.env.AETHER_INTERNAL_SECRET
if (!INTERNAL_SECRET) throw new Error("AETHER_INTERNAL_SECRET missing")

function resolvePath(currentLocale: string, path: string, map: Record<string, string>, reverseLookup: boolean = false) {
    const exactKey = reverseLookup ? path : `${currentLocale}:${path}`
    if (map[exactKey]) {
        return { found: true, value: map[exactKey], suffix: '' }
    }

    const parts = path.split('/').filter(Boolean)
    for (let i = parts.length - 1; i >= 0; i--) {
        const partialPath = '/' + parts.slice(0, i + 1).join('/')
        const key = reverseLookup ? partialPath : `${currentLocale}:${partialPath}`

        if (map[key]) {
            const suffixParts = parts.slice(i + 1)
            const suffix = suffixParts.length > 0 ? '/' + suffixParts.join('/') : ''
            return { found: true, value: map[key], suffix: suffix }
        }
    }

    return { found: false, value: null, suffix: null }
}

async function fetchSystemConfig(baseUrl: string) {
    try {
        const [localesRes, routesRes] = await Promise.all([
            fetch(`${baseUrl}/api/config/locales`, { next: { tags: ["config"] }, headers: { "x-internal-secret": INTERNAL_SECRET! } }),
            fetch(`${baseUrl}/api/config/routes`, { next: { tags: ["routes"] }, headers: { "x-internal-secret": INTERNAL_SECRET! } }),
        ])
        if (!localesRes.ok || !routesRes.ok) return null
        const localeData = await localesRes.json()
        const routeData = await routesRes.json()
        return {
            locales: localeData.locales as string[],
            defaultLocale: localeData.defaultLocale as string,
            rewrites: routeData.rewrites as Record<string, string>,
            routes: routeData.routes as Record<string, string>,
            reverseMap: routeData.reverseMap as Record<string, string>
        }
    } catch { return null }
}

function hasLocalePrefix(path: string, locales: string[]) {
    return new RegExp(`^/(${locales.join("|")})(/|$)`).test(path)
}

function getLocaleFromAcceptLanguage(acceptLanguage: string | null, supportedLocales: string[], defaultLocale: string) {
    if (!acceptLanguage) return defaultLocale
    const languages = acceptLanguage.split(",").map((lang) => {
        const [code, priority = "q=1"] = lang.trim().split(";")
        return { code: code.split("-")[0].toLowerCase(), q: parseFloat(priority.replace("q=", "")) || 1 }
    }).sort((a, b) => b.q - a.q)
    for (const { code } of languages) { if (supportedLocales.includes(code)) return code }
    return defaultLocale
}

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { pathname } = req.nextUrl

    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p)) || STATIC_FILE_REGEX.test(pathname)) {
        return NextResponse.next()
    }

    const config = await fetchSystemConfig(req.nextUrl.origin)
    if (!config) return NextResponse.next()

    const { locales, defaultLocale, rewrites, routes, reverseMap } = config

    if (hasLocalePrefix(pathname, locales)) {
        const currentLocale = pathname.split("/")[1]
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/"

        const isLoggedIn = !!req.auth
        const userRole = req.auth?.user?.userType || "USER"
        const username = req.auth?.user?.username

        const rewriteRes = resolvePath(currentLocale, pathWithoutLocale, rewrites, false)
        const internalPath = rewriteRes.found
            ? (rewriteRes.value! + rewriteRes.suffix!)
            : pathWithoutLocale

        const keyRes = resolvePath(currentLocale, pathWithoutLocale, reverseMap, true)
        const currentRouteKey = keyRes.found ? keyRes.value : null

        if (internalPath.startsWith(ADMIN_PREFIX)) {
            const hasAccess = isLoggedIn && (userRole === "GOD" || userRole === "ADMIN")
            if (!hasAccess) {
                return NextResponse.rewrite(new URL(`/${currentLocale}/404`, req.url))
            }
        }

        if (isLoggedIn && currentRouteKey && GUEST_ONLY_ROUTES.includes(currentRouteKey)) {
            const profileBase = routes[`${currentLocale}:${PROFILE_KEY}`] || '/profile'
            const targetUrl = username ? `${profileBase}/${username}` : '/'
            return NextResponse.redirect(new URL(`/${currentLocale}${targetUrl}`, req.url))
        }

        if (currentRouteKey) {
            const canonicalBase = routes[`${currentLocale}:${currentRouteKey}`]

            if (canonicalBase) {
                const expectedPath = canonicalBase + (keyRes.suffix || '')

                if (pathWithoutLocale !== expectedPath) {
                    return NextResponse.redirect(new URL(`/${currentLocale}${expectedPath}`, req.url))
                }
            }
        }
        if (rewriteRes.found) {
            const rewriteUrl = new URL(`/${currentLocale}${internalPath}`, req.url)
            rewriteUrl.search = req.nextUrl.search
            return NextResponse.rewrite(rewriteUrl)
        }

        return NextResponse.next()
    }

    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value
    const acceptLocale = getLocaleFromAcceptLanguage(req.headers.get("accept-language"), locales, defaultLocale)
    const locale = (cookieLocale && locales.includes(cookieLocale)) ? cookieLocale : acceptLocale

    const newUrl = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, req.url)
    newUrl.search = req.nextUrl.search
    const response = NextResponse.redirect(newUrl)
    response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 31536000, sameSite: "lax" })

    return response
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
}