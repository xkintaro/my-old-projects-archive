"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { themes } from "@/lib/themes"

const themeNames = themes.map(t => t.name)

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            themes={themeNames}
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
