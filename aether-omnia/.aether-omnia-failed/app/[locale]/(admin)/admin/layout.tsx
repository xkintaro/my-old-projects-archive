import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { SessionProvider } from "@/providers/session-provider"
import { TranslationProvider } from "@/providers/translation-provider"
import { RouteProvider } from "@/providers/route-provider"
import { fontSans, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/features/admin/admin-sidebar"
import { AdminHeader } from "@/components/features/admin/admin-header"
import { getLocaleData, getAvailableLanguages } from "@/lib/i18n/config"
import { getTranslations } from "@/lib/i18n/get-translations"
import { getRoutesMap } from "@/lib/i18n/get-routes"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
    title: "Admin Panel | Yönetim Merkezi",
}

interface AdminLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export default async function AdminRootLayout({
    children,
    params,
}: AdminLayoutProps) {
    const { locale } = await params

    const localeData = await getLocaleData(locale)
    if (!localeData || !localeData.isActiveAdmin) {
        notFound()
    }

    const [languages, translations, routes] = await Promise.all([
        getAvailableLanguages("ADMIN"),
        getTranslations(locale, ["ADMIN", "COMMON"]),
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
                                <SidebarProvider>
                                    <AdminSidebar />
                                    <SidebarInset>
                                        <AdminHeader languages={languages} />
                                        <main className="flex-1 overflow-auto">
                                            {children}
                                        </main>
                                    </SidebarInset>
                                </SidebarProvider>
                            </TranslationProvider>
                        </RouteProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    )
}