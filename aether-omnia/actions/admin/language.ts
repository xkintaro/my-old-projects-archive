'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { i18nConfig } from '@/lib/i18n/config';
import { ADMIN_PREFIX, type AdminLocale } from '@/config/routes';

export async function setAdminLanguage(locale: AdminLocale) {
    const cookieStore = await cookies();

    cookieStore.set(i18nConfig.adminCookieName, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    revalidatePath(ADMIN_PREFIX, 'layout');
}