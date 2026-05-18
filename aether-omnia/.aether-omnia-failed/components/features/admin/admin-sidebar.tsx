"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    LayoutDashboard,
    Settings,
    ChevronRight,
    LogOut,
    Bell,
    Command,
    Globe,
    type LucideIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useT } from "@/providers/translation-provider"
import { useRoute } from "@/providers/route-provider"
interface NavItem {
    title: string
    url: string
    icon?: LucideIcon
    subItems?: NavItem[]
}


function useNavItems() {
    const t = useT()
    const { getLink, locale } = useRoute()

    const mainNavItems: NavItem[] = [
        { title: t("admin.dashboard"), url: getLink("dashboard"), icon: LayoutDashboard },
    ]

    const localizationItems: NavItem[] = [
        {
            title: t("admin.localization"),
            url: getLink("languages"),
            icon: Globe,
            subItems: [
                { title: t("admin.languages"), url: getLink("languages") },
                { title: t("admin.translations"), url: getLink("translations") },
            ],
        },
    ]

    return { mainNavItems, localizationItems, t, locale }
}

const noHoverStyles = "hover:!bg-transparent active:!bg-transparent data-[active=true]:!bg-transparent data-[state=open]:!bg-transparent focus:!bg-transparent bg-transparent"

const activeStyles = cn(
    noHoverStyles,
    "!bg-transparent shadow-none",
    "!text-primary font-medium",
    "hover:!text-primary"
)

const activeSubStyles = cn(
    noHoverStyles,
    "!bg-transparent shadow-none",
    "!text-primary font-medium",
    "hover:!text-primary"
)

const subButtonStyles = cn(noHoverStyles, "!bg-transparent shadow-none")

function SubNavItem({
    item,
    pathname,
}: {
    item: NavItem
    pathname: string
}) {
    const isExactMatch = pathname === item.url

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton
                asChild
                isActive={isExactMatch}
                className={cn(
                    subButtonStyles,
                    isExactMatch && activeSubStyles
                )}
            >
                <Link href={item.url}>
                    <span>{item.title}</span>
                    {isExactMatch && (
                        <span className="ml-auto size-2 rounded-full bg-primary" />
                    )}
                </Link>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

function NavItemComponent({
    item,
    pathname,
    isCollapsed = false,
}: {
    item: NavItem
    pathname: string
    isCollapsed?: boolean
}) {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExactMatch = pathname === item.url
    const isParentActive = pathname.startsWith(item.url) && item.url !== "/admin"
    const isActive = item.url === "/admin" ? pathname === "/admin" : isExactMatch

    const [isOpen, setIsOpen] = useState(isParentActive)

    if (isCollapsed) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isParentActive || isActive}
                    className={cn((isParentActive || isActive) && activeStyles)}
                >
                    <Link href={item.url}>
                        {item.icon && <item.icon className="size-4" />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    if (hasSubItems) {
        return (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                                "group/item",
                                isParentActive && activeStyles
                            )}
                        >
                            {item.icon && <item.icon className="size-4" />}
                            <span className="flex-1">{item.title}</span>
                            <ChevronRight
                                className={cn(
                                    "ml-auto size-4 shrink-0 transition-transform duration-200 text-muted-foreground/50!",
                                    isOpen && "rotate-90"
                                )}
                            />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.subItems!.map((subItem) => (
                                <SubNavItem
                                    key={subItem.url}
                                    item={subItem}
                                    pathname={pathname}
                                />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        )
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className={cn(isActive && activeStyles)}
            >
                <Link href={item.url}>
                    {item.icon && <item.icon className="size-4" />}
                    <span>{item.title}</span>
                    {isActive && (
                        <span className="ml-auto size-2 rounded-full bg-primary" />
                    )}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}

export function AdminSidebar() {
    const pathname = usePathname()
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"
    const { mainNavItems, localizationItems, t, locale } = useNavItems()
    const { getLink } = useRoute()
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="overflow-x-hidden">
            <SidebarHeader className="border-b border-sidebar-border h-16 items-center justify-center">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={getLink("dashboard")} className="flex items-center gap-2">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Aether Zenith</span>
                                    <span className="truncate text-xs text-muted-foreground">Yönetim Merkezi</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-x-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel>{t("admin.general")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <NavItemComponent
                                    key={item.url}
                                    item={item}
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="mx-0" />

                <SidebarGroup>
                    <SidebarGroupLabel>{t("admin.localization")}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {localizationItems.map((item) => (
                                <NavItemComponent
                                    key={item.url}
                                    item={item}
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="group/user">
                                    <Avatar className="size-8 rounded-lg">
                                        <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
                                        <AvatarFallback className="rounded-lg bg-primary/10 text-primary">AD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Admin User</span>
                                        <span className="truncate text-xs text-muted-foreground">admin@example.com</span>
                                    </div>
                                    <ChevronRight className="ml-auto size-4 text-muted-foreground/50 transition-transform duration-200 group-data-[state=open]/user:-rotate-90" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side={isCollapsed ? "right" : "top"}
                                align={isCollapsed ? "start" : "end"}
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <Bell className="mr-2 size-4" />
                                    <span>Bildirimler</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 size-4" />
                                    <span>Hesap Ayarları</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive hover:bg-destructive/20! cursor-pointer">
                                    <LogOut className="mr-2 size-4 text-destructive" />
                                    <span>Çıkış Yap</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
