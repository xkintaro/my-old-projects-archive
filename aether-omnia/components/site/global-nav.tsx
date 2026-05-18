'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_ROUTES, APP_URL, ADMIN_PREFIX, type SiteRouteKey } from '@/config/routes';
import { useLocale } from '@/hooks/use-locale';
import { resolveRoute } from '@/lib/navigation/utils';
import { useTranslate } from '@/lib/i18n/client';

export function GlobalNav() {
    const locale = useLocale();
    const { t } = useTranslate();
    const pathname = usePathname();

    return (
        <nav>
            <hr />
            <table>
                <tbody>
                    <tr>
                        {(Object.keys(SITE_ROUTES) as SiteRouteKey[]).map((key) => {
                            const href = resolveRoute(key, locale);
                            const absolutePathname = `${APP_URL}${pathname}`;
                            const isActive = absolutePathname === href;

                            return (
                                <td key={key} style={{ padding: '0 0.5rem' }}>
                                    <Link href={href}>
                                        {isActive ? (
                                            <strong><u>{t(`site.${key}` as any)}</u></strong>
                                        ) : (
                                            t(`site.${key}` as any)
                                        )}
                                    </Link>
                                </td>
                            );
                        })}
                        <td>
                            <Link href={ADMIN_PREFIX}>
                                <strong><u>{t('site.admin')}</u></strong>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <small>Dil: <b>{locale}</b></small>
            <hr />
        </nav>
    );
}