import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_PREFIX, SITE_DEFAULT_LOCALE, SITE_LOCALES, SITE_ROUTES, APP_URL } from '@/config/routes';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const requestHeaders = new Headers(request.headers);

    if (ADMIN_PREFIX) {
        const isExactAdmin = pathname === ADMIN_PREFIX;
        const isAdminSubRoute = pathname.startsWith(ADMIN_PREFIX + '/');

        if (isExactAdmin || isAdminSubRoute) {
            if (ADMIN_PREFIX !== '/admin') {
                const url = request.nextUrl.clone();
                url.pathname = pathname.replace(ADMIN_PREFIX, '/admin');
                return NextResponse.rewrite(url);
            }
            return NextResponse.next();
        }
    }

    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (!firstSegment) {
        return NextResponse.redirect(`${APP_URL}/${SITE_DEFAULT_LOCALE}`);
    }

    if (SITE_LOCALES.includes(firstSegment as typeof SITE_LOCALES[number])) {

        const currentLocale = firstSegment as keyof typeof SITE_ROUTES.home;

        requestHeaders.set('x-current-locale', currentLocale);

        const pathWithoutLocale = `/${segments.slice(1).join('/')}`;

        if (pathWithoutLocale === '/') {
            return NextResponse.next({ request: { headers: requestHeaders } });
        }

        const profileRouteKey = Object.keys(SITE_ROUTES).find(k => k === 'profile') as keyof typeof SITE_ROUTES;
        if (profileRouteKey) {
            const profileRoutes = SITE_ROUTES[profileRouteKey] as Record<string, string>;
            const currentLocaleProfilePath = profileRoutes[currentLocale];
            const fallbackProfilePath = profileRoutes[SITE_DEFAULT_LOCALE];

            for (const [, localePath] of Object.entries(profileRoutes)) {
                if (pathWithoutLocale.startsWith(localePath + '/') && pathWithoutLocale !== localePath + '/') {
                    const username = pathWithoutLocale.slice(localePath.length + 1);

                    if (currentLocaleProfilePath && localePath !== currentLocaleProfilePath) {
                        return NextResponse.redirect(
                            `${APP_URL}/${currentLocale}${currentLocaleProfilePath}/${username}`
                        );
                    }

                    return NextResponse.rewrite(
                        new URL(`/${currentLocale}/${profileRouteKey}/${username}`, request.url),
                        { request: { headers: requestHeaders } }
                    );
                }
            }

            if (!currentLocaleProfilePath && pathWithoutLocale.startsWith(fallbackProfilePath + '/')) {
                const username = pathWithoutLocale.slice(fallbackProfilePath.length + 1);
                return NextResponse.rewrite(
                    new URL(`/${currentLocale}/${profileRouteKey}/${username}`, request.url),
                    { request: { headers: requestHeaders } }
                );
            }
        }

        let matchedRouteKey: string | null = null;
        const potentialKey = segments[1];

        if (potentialKey && SITE_ROUTES[potentialKey as keyof typeof SITE_ROUTES]) {
            matchedRouteKey = potentialKey;
        }

        if (!matchedRouteKey) {
            for (const [key, values] of Object.entries(SITE_ROUTES)) {
                const localeSpecificPath = (values as Record<string, string>)[currentLocale];
                const fallbackPath = (values as Record<string, string>)[SITE_DEFAULT_LOCALE];

                if (localeSpecificPath === pathWithoutLocale ||
                    (!localeSpecificPath && fallbackPath === pathWithoutLocale)) {
                    matchedRouteKey = key;
                    break;
                }
            }
        }

        if (matchedRouteKey) {
            const routeConfig = SITE_ROUTES[matchedRouteKey as keyof typeof SITE_ROUTES];

            const targetPath = (routeConfig as Record<string, string>)[currentLocale]
                ?? (routeConfig as Record<string, string>)[SITE_DEFAULT_LOCALE];
            const internalPath = `/${matchedRouteKey}`;

            if (targetPath && targetPath !== pathWithoutLocale) {
                return NextResponse.redirect(`${APP_URL}/${currentLocale}${targetPath}`);
            }

            if (pathWithoutLocale !== internalPath) {
                return NextResponse.rewrite(
                    new URL(`/${currentLocale}${internalPath}`, request.url),
                    { request: { headers: requestHeaders } }
                );
            }
        }

        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    return NextResponse.rewrite(new URL(`/${SITE_DEFAULT_LOCALE}/404`, request.url));
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)'],
};
