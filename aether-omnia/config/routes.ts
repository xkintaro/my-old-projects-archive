export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL as string).replace(/\/$/, '');

export const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX as string;

// -----------------------------------------------------------------------------
// 1. ADMIN LANGUAGES
// -----------------------------------------------------------------------------

export const ADMIN_LOCALES = ['tr', 'en'] as const;

export const ADMIN_DEFAULT_LOCALE = 'tr';

export type AdminLocale = (typeof ADMIN_LOCALES)[number];

export const ADMIN_LOCALE_LABELS: Record<AdminLocale, string> = {
    tr: 'Türkçe',
    en: 'English',
};

export const ADMIN_LOCALE_COOKIE_NAME = process.env.ADMIN_LOCALE_COOKIE as string;

// -----------------------------------------------------------------------------
// 2. SITE LANGUAGES
// -----------------------------------------------------------------------------

export const SITE_LOCALES = ['tr', 'en', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ar', 'zh', 'ja', 'ko'] as const;

export const SITE_DEFAULT_LOCALE = 'tr';

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const SITE_LOCALE_LABELS: Record<SiteLocale, string> = {
    tr: 'Türkçe',
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    ar: 'العربية',
    zh: '中文',
    ja: '日本語',
    ko: '한국어',
};

export const SITE_ROUTES = {
    home: {
        tr: '/',
        en: '/',
    },
    login: {
        tr: '/giris',
        en: '/login',
    },
    register: {
        tr: '/kayit',
        en: '/register',
    },
    logout: {
        tr: '/cikis',
        en: '/logout',
    },
    profile: {
        tr: '/profil',
        en: '/profile',
    },
    settings: {
        tr: '/ayarlar',
        en: '/settings',
    },
} as const;

export type SiteRouteKey = keyof typeof SITE_ROUTES;
