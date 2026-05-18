'use client';

import { useLocale } from '@/hooks/use-locale';
import { resolveRoute } from '@/lib/navigation/utils';
import type { SiteRouteKey, SiteLocale } from '@/config/routes';

export function useRoute(key: SiteRouteKey, locale?: SiteLocale): string {
    const currentLocale = useLocale();
    return resolveRoute(key, locale ?? currentLocale);
}