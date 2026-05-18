'use client';

import { useParams } from 'next/navigation';
import type { SiteLocale } from '@/config/routes';

export function useLocale(): SiteLocale {
  const params = useParams();
  const locale = params?.locale as SiteLocale | undefined;

  if (!locale) {
    throw new Error('[useLocale] Locale parametresi bulunamadı.');
  }

  return locale;
}