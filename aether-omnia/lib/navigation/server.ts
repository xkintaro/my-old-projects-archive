import 'server-only';
import { redirect } from 'next/navigation';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from './utils';
import { type SiteRouteKey, type SiteLocale } from '@/config/routes';

export async function getRouteUrl(
  key: SiteRouteKey,
  locale?: SiteLocale
): Promise<string> {
  let targetLocale = locale;

  if (!targetLocale) {
    targetLocale = await getLocale();
  }

  return resolveRoute(key, targetLocale);
}

export async function redirectTo(key: SiteRouteKey, locale?: SiteLocale): Promise<never> {
  const url = await getRouteUrl(key, locale);
  redirect(url);
}