"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useT, useLocale } from "@/providers/translation-provider"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { ThemePalette } from "@/components/shared/theme-palette"
import { LanguageSwitcher, type Language } from "@/components/shared/language-switcher"

interface AdminHeaderProps {
    languages: Language[]
}

export function AdminHeader({ languages }: AdminHeaderProps) {
    const pathname = usePathname()
    const locale = useLocale()
    const t = useT()

    const getRouteName = (segment: string): string => {
        const routeTranslations: Record<string, string> = {
            admin: t("admin.dashboard"),
            users: t("admin.users"),
            products: t("admin.products"),
            orders: t("admin.orders"),
            settings: t("admin.settings"),
            analytics: t("admin.analytics"),
            reports: t("admin.reports"),
            help: t("admin.help"),
            roles: t("admin.roles"),
            categories: t("admin.categories"),
            languages: t("admin.languages"),
            translations: t("admin.translations"),
            new: t("common.add_new"),
            edit: t("common.edit"),
        }
        return routeTranslations[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    const pathSegments = pathname
        .split("/")
        .filter(Boolean)
        .filter(segment => segment !== locale)

    const [origin, setOrigin] = React.useState("")

    React.useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const breadcrumbs = pathSegments.map((segment, index) => {
        const relativeHref = `/${locale}/${pathSegments.slice(0, index + 1).join("/")}`
        const href = origin ? `${origin}${relativeHref}` : relativeHref

        const isLast = index === pathSegments.length - 1
        const name = getRouteName(segment)

        return { name, href, isLast }
    })

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 backdrop-blur-xl transition-all">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.href}>
                                {index > 0 && <BreadcrumbSeparator />}
                                <BreadcrumbItem>
                                    {crumb.isLast ? (
                                        <BreadcrumbPage className="font-medium">{crumb.name}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={crumb.href}>
                                            {crumb.name}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="ml-auto flex items-center gap-2 px-4">
                <LanguageSwitcher languages={languages} />
                <ThemeToggle />
                <ThemePalette />
            </div>
        </header>
    )
}
