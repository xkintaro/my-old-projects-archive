'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_LOCALES, SITE_LOCALE_LABELS } from '@/config/routes';
import { useLocale } from '@/hooks/use-locale';
import { switchLocaleUrl } from '@/lib/navigation/utils';

export function LanguageSwitcher() {
    const currentLocale = useLocale();
    const pathname = usePathname();

    return (
        <nav>
            {SITE_LOCALES.map((locale) => {
                const href = switchLocaleUrl(pathname, locale);
                const isActive = locale === currentLocale;

                return (
                    <span key={locale} style={{ padding: '0 0.5rem' }}>
                        {isActive ? (
                            <strong>[{SITE_LOCALE_LABELS[locale]}]</strong>
                        ) : (
                            <Link href={href}>{SITE_LOCALE_LABELS[locale]}</Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}