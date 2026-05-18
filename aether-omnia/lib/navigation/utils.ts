import {
    SITE_ROUTES,
    SITE_DEFAULT_LOCALE,
    APP_URL,
    type SiteRouteKey,
    type SiteLocale
} from '@/config/routes';

export function resolveRoute(key: SiteRouteKey, locale: SiteLocale = SITE_DEFAULT_LOCALE): string {
    const routeConfig = SITE_ROUTES[key];

    if (!routeConfig) {
        throw new Error(`[resolveRoute] Geçersiz rota anahtarı: '${key}'`);
    }

    const path = (routeConfig as Record<string, string>)[locale]
        ?? (routeConfig as Record<string, string>)[SITE_DEFAULT_LOCALE];

    if (!path) {
        throw new Error(`[resolveRoute] '${key}' rotası için path bulunamadı`);
    }

    const relativePath = path === '/' ? `/${locale}` : `/${locale}${path}`;
    return `${APP_URL}${relativePath}`;
}

export function getRouteKeyFromPath(path: string, locale: string): SiteRouteKey | null {
    for (const [key, values] of Object.entries(SITE_ROUTES)) {
        const localePath = (values as Record<string, string>)[locale];
        const fallbackPath = (values as Record<string, string>)[SITE_DEFAULT_LOCALE];

        if (localePath === path || fallbackPath === path) {
            return key as SiteRouteKey;
        }
    }
    return null;
}

export function getLocalizedPath(routeKey: SiteRouteKey, locale: SiteLocale): string {
    const routeConfig = SITE_ROUTES[routeKey] as Record<string, string>;
    return routeConfig[locale] ?? routeConfig[SITE_DEFAULT_LOCALE] ?? '/';
}

export function switchLocaleUrl(currentPathname: string, targetLocale: SiteLocale): string {
    const segments = currentPathname.split('/').filter(Boolean);

    if (segments.length === 0) {
        return `${APP_URL}/${targetLocale}`;
    }

    const currentLocale = segments[0];
    const restSegments = segments.slice(1);

    if (restSegments.length === 0) {
        return `${APP_URL}/${targetLocale}`;
    }

    const translatedSegments: string[] = [];

    for (let i = 0; i < restSegments.length; i++) {
        const segment = restSegments[i];
        const currentPath = `/${segment}`;

        const routeKey = getRouteKeyFromPath(currentPath, currentLocale);

        if (routeKey) {
            const targetPath = getLocalizedPath(routeKey, targetLocale);

            if (targetPath && targetPath !== '/') {
                translatedSegments.push(targetPath.slice(1));
            } else {
                translatedSegments.push(segment);
            }
        } else {
            translatedSegments.push(segment);
        }
    }

    if (translatedSegments.length === 0) {
        return `${APP_URL}/${targetLocale}`;
    }

    return `${APP_URL}/${targetLocale}/${translatedSegments.join('/')}`;
}