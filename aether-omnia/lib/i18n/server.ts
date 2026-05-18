import 'server-only';
import { headers, cookies } from 'next/headers';
import { i18nConfig } from './config';
import { SITE_DEFAULT_LOCALE, type SiteLocale, type AdminLocale } from '@/config/routes';
import type { Namespace, GlobalDictionary, TranslateFn } from '@/types/i18n';

// ----------------------------------------------------------------------------
// 1. LOCALE GETTERS
// ----------------------------------------------------------------------------

export async function getLocale(): Promise<SiteLocale> {
    const headersList = await headers();
    const locale = headersList.get('x-current-locale') as SiteLocale | null;
    return locale || SITE_DEFAULT_LOCALE;
}

export async function getAdminLocale(): Promise<AdminLocale> {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get(i18nConfig.adminCookieName);

    if (localeCookie && i18nConfig.adminLocales.includes(localeCookie.value as AdminLocale)) {
        return localeCookie.value as AdminLocale;
    }
    return i18nConfig.adminDefaultLocale;
}

// ----------------------------------------------------------------------------
// 2. DICTIONARY LOADER
// ----------------------------------------------------------------------------

export const getDictionary = async (namespace: Namespace, locale: string): Promise<Partial<GlobalDictionary>> => {
    try {
        const module = await import(`@/messages/${namespace}/${locale}.json`);
        return { [namespace]: module.default };
    } catch (error) {
        console.warn(`[i18n] '${locale}' için '${namespace}' dosyası bulunamadı.`);
        return { [namespace]: {} };
    }
};

// ----------------------------------------------------------------------------
// 3. TRANSLATOR GENERATOR
// ----------------------------------------------------------------------------

export async function getServerTranslator(namespace: Namespace) {
    let locale: string;

    if (namespace === 'admin') {
        locale = await getAdminLocale();
    } else {
        locale = await getLocale();
    }

    const dictWrapper = await getDictionary(namespace, locale);
    const dict = dictWrapper as any;

    const t: TranslateFn = (key, params) => {
        const [ns, k] = key.split('.');
        let text = dict[ns]?.[k];

        if (!text) return key;

        if (params && typeof text === 'string') {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
            });
        }
        return text;
    };

    return { t };
}