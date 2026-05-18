import { getAdminLocale } from '@/lib/i18n/server';
import { setAdminLanguage } from '@/actions/admin/language';
import { ADMIN_LOCALES, ADMIN_LOCALE_LABELS } from '@/config/routes';

export async function AdminLanguageSwitcher() {
    const currentLocale = await getAdminLocale();

    return (
        <nav>
            {ADMIN_LOCALES.map((locale) => {
                const isActive = currentLocale === locale;
                const label = ADMIN_LOCALE_LABELS[locale];

                return (
                    <form key={locale} action={setAdminLanguage.bind(null, locale)} style={{ display: 'inline-block', marginRight: '10px' }}>
                        <button disabled={isActive}>
                            {isActive ? <strong>[{label}]</strong> : label}
                        </button>
                    </form>
                );
            })}
        </nav>
    );
}