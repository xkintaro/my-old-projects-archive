import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getAdminLocale, getDictionary } from '@/lib/i18n/server';
import { I18nProvider } from '@/lib/i18n/client';
import { AdminLanguageSwitcher } from '@/components/admin/language-switcher';
import Link from 'next/link';

const ALLOWED_ROLES = ['god', 'admin'];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }

  const userRole = session.user.role?.toLowerCase();
  if (!userRole || !ALLOWED_ROLES.includes(userRole)) {
    notFound();
  }

  const locale = await getAdminLocale();
  const dictionary = await getDictionary('admin', locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <I18nProvider dictionary={dictionary}>
          <header>
            <i>AdminLayout ({locale})</i>
            <hr />
            <AdminLanguageSwitcher />
            <hr />
            <Link href={`/${locale}`}>Site</Link>
            <hr />
          </header>
          <main>
            {children}
          </main>
        </I18nProvider>
      </body>
    </html>
  );
}