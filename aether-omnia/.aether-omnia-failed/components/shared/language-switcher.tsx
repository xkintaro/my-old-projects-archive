"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/providers/translation-provider"

export interface Language {
    code: string
    name: string
    flag: string
}

interface LanguageSwitcherProps {
    languages: Language[]
}

export function LanguageSwitcher({
    languages,
}: LanguageSwitcherProps) {
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = useLocale()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const switchLocale = (newLocale: string) => {
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`

        const origin = window.location.origin
        router.push(`${origin}${newPath}`)
    }

    const currentLanguage = languages?.find(l => l.code === currentLocale) || languages?.[0]

    if (!currentLanguage) return null

    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="icon"
                disabled
                aria-label="Dil değiştirici yükleniyor"
            >
                <Globe className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label={`Dil değiştir: ${currentLanguage.name}`}
                >
                    <span className="text-lg leading-none filter grayscale-0 hover:grayscale-0 transition-all" aria-hidden="true">
                        {currentLanguage.flag}
                    </span>
                    <span className="sr-only">Dil Değiştir: {currentLanguage.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => {
                    const isActive = currentLocale === lang.code
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => switchLocale(lang.code)}
                            className="gap-2 cursor-pointer"
                            aria-selected={isActive}
                        >
                            <span className="text-base" aria-hidden="true">{lang.flag}</span>
                            <span>{lang.name}</span>
                            {isActive && (
                                <Check className="ml-auto h-4 w-4" aria-hidden="true" />
                            )}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
