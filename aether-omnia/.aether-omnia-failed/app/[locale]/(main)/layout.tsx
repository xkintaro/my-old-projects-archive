import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/theme-provider"
import { SessionProvider } from "@/providers/session-provider"
import { TranslationProvider } from "@/providers/translation-provider"
import { RouteProvider } from "@/providers/route-provider"
import { fontSans, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemePalette } from "@/components/shared/theme-palette";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getLocaleData, getAvailableLanguages } from "@/lib/i18n/config"
import { getTranslations, t } from "@/lib/i18n/get-translations"
import { getRoutesMap } from "@/lib/i18n/get-routes"
import { notFound } from "next/navigation"
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import Link from "next/link";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

interface MainLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function MainLayout({
  children,
  params,
}: MainLayoutProps) {
  const { locale } = await params

  const localeData = await getLocaleData(locale)
  if (!localeData) {
    notFound()
  }

  const [languages, translations, routes] = await Promise.all([
    getAvailableLanguages("PUBLIC"),
    getTranslations(locale, ["SITE", "COMMON"]),
    getRoutesMap()
  ])

  return (
    <html lang={locale} dir={localeData.direction} suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
        fontMono.variable
      )}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RouteProvider routes={routes} locale={locale}>
              <TranslationProvider locale={locale} translations={translations}>
                <div className="fixed top-5 right-5 flex items-center gap-2 z-999">
                 




                  <LanguageSwitcher languages={languages} />
                  <ThemeToggle />
                  <ThemePalette />
                </div>
                {children}
              </TranslationProvider>
            </RouteProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}