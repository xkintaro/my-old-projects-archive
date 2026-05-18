import { GlobalNav } from '@/components/site/global-nav';
import { LanguageSwitcher } from '@/components/site/language-switcher';
import { getLocale, getDictionary } from '@/lib/i18n/server';
import { I18nProvider } from '@/lib/i18n/client';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getDictionary('site', locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <body>
        <I18nProvider dictionary={dictionary}>
          <header>
            <i>RootLayout ({locale})</i>
            <hr />
            <LanguageSwitcher />
          </header>
          <GlobalNav />
          <main>{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}