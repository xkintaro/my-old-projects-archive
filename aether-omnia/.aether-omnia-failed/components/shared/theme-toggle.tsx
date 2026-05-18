"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check, Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { theme: currentTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" disabled aria-label="Tema değiştirici yükleniyor">
                <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Tema değiştir">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
                    <span className="sr-only">Tema Değiştir</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")} className="gap-2" aria-selected={currentTheme === "light"}>
                    <Sun className="h-4 w-4" aria-hidden="true" />
                    Light
                    {currentTheme === "light" && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
                    <span className="sr-only">{currentTheme === "light" ? "(seçili)" : ""}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-2" aria-selected={currentTheme === "dark"}>
                    <Moon className="h-4 w-4" aria-hidden="true" />
                    Dark
                    {currentTheme === "dark" && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
                    <span className="sr-only">{currentTheme === "dark" ? "(seçili)" : ""}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="gap-2" aria-selected={currentTheme === "system"}>
                    <Monitor className="h-4 w-4" aria-hidden="true" />
                    System
                    {currentTheme === "system" && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
                    <span className="sr-only">{currentTheme === "system" ? "(seçili)" : ""}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
