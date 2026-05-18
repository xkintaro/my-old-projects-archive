import { SITE_LOCALES, SITE_DEFAULT_LOCALE, ADMIN_LOCALES, ADMIN_DEFAULT_LOCALE, ADMIN_LOCALE_COOKIE_NAME } from '@/config/routes';

export const i18nConfig = {
    defaultLocale: SITE_DEFAULT_LOCALE,
    locales: SITE_LOCALES,
    adminLocales: ADMIN_LOCALES,
    adminDefaultLocale: ADMIN_DEFAULT_LOCALE,
    adminCookieName: ADMIN_LOCALE_COOKIE_NAME
} as const;

export type Locale = (typeof i18nConfig.locales)[number];
export type AdminLocale = (typeof i18nConfig.adminLocales)[number];