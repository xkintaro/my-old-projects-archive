"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { themes, themeCategories } from "@/lib/themes"
import { cn } from "@/lib/utils"

function ColorOrb({
    themeName,
    label,
    color,
    currentTheme,
    onSelect,
    index
}: {
    themeName: string
    label: string
    color: string
    currentTheme: string | undefined
    onSelect: (name: string) => void
    index: number
}) {
    const isActive = currentTheme === themeName

    return (
        <button
            onClick={() => onSelect(themeName)}
            className={cn(
                "group relative flex flex-col items-center justify-center gap-1.5",
                "transition-all duration-300 ease-out",
                "animate-in fade-in-0 zoom-in-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
            )}
            style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: 'backwards'
            }}
            aria-label={`${label} temasını seç${isActive ? ' (seçili)' : ''}`}
            aria-pressed={isActive}
            type="button"
        >
            <div
                className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: color }}
                aria-hidden="true"
            />
            <div
                className={cn(
                    "relative w-12 h-12 rounded-full shadow-lg",
                    "transition-all duration-300 ease-out",
                    "group-hover:scale-110 group-hover:shadow-xl"
                )}
                style={{
                    backgroundColor: color,
                    boxShadow: `0 4px 14px ${color}30`
                }}
            >
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 via-transparent to-black/20" aria-hidden="true" />
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in-50 duration-200">
                        <Check className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={3} aria-hidden="true" />
                    </div>
                )}
            </div>
            <span className={cn(
                "text-[10px] font-medium tracking-wide uppercase transition-all duration-200",
                isActive
                    ? "text-foreground"
                    : "text-muted-foreground/70 group-hover:text-foreground"
            )} aria-hidden="true">
                {label}
            </span>
        </button>
    )
}

function SystemOrb({
    currentTheme,
    onSelect,
    index
}: {
    currentTheme: string | undefined
    onSelect: (name: string) => void
    index: number
}) {
    const isActive = currentTheme === "system"

    return (
        <button
            onClick={() => onSelect("system")}
            className={cn(
                "group relative flex flex-col items-center justify-center gap-1.5",
                "transition-all duration-300 ease-out",
                "animate-in fade-in-0 zoom-in-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
            )}
            style={{
                animationDelay: `${index * 30}ms`,
                animationFillMode: 'backwards'
            }}
            aria-label={`Sistem temasını seç${isActive ? ' (seçili)' : ''}`}
            aria-pressed={isActive}
            type="button"
        >
            <div
                className={cn(
                    "relative w-12 h-12 rounded-full shadow-lg overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "group-hover:scale-110 group-hover:shadow-xl"
                )}
            >
                <div className="absolute inset-0 w-1/2 bg-white" aria-hidden="true" />
                <div className="absolute right-0 inset-y-0 w-1/2 bg-zinc-900" aria-hidden="true" />
                <div className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-linear-to-b from-transparent via-muted-foreground/30 to-transparent" aria-hidden="true" />
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 animate-in zoom-in-50 duration-200">
                        <Check className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={3} aria-hidden="true" />
                    </div>
                )}
            </div>
            <span className={cn(
                "text-[10px] font-medium tracking-wide uppercase transition-all duration-200",
                isActive
                    ? "text-foreground"
                    : "text-muted-foreground/70 group-hover:text-foreground"
            )} aria-hidden="true">
                System
            </span>
        </button>
    )
}

export function ThemePalette() {
    const { theme: currentTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const groupedThemes = React.useMemo(() => {
        return {
            base: themes.filter(t => t.category === "base"),
            color: themes.filter(t => t.category === "color"),
            neutral: themes.filter(t => t.category === "neutral"),
        }
    }, [])

    const handleThemeSelect = (themeName: string) => {
        setTheme(themeName)
        setOpen(false)
    }

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" disabled aria-label="Tema seçici yükleniyor">
                <Palette className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
            </Button>
        )
    }

    const currentThemeData = themes.find(t => t.name === currentTheme)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative overflow-hidden group"
                    aria-label="Tema panelini aç"
                >
                    <Palette className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
                    <span className="sr-only">Tema Ayarları</span>

                    {currentThemeData && (
                        <div
                            className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 group-hover:opacity-0"
                            style={{ backgroundColor: currentThemeData.color }}
                            aria-hidden="true"
                        />
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-xl overflow-hidden border-border/50 bg-background/95 backdrop-blur-xl"
                aria-describedby={undefined}
            >
                <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
                    <div
                        className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-10"
                        style={{ backgroundColor: currentThemeData?.color || "#fff" }}
                    />
                    <div
                        className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-5"
                        style={{ backgroundColor: currentThemeData?.color || "#fff" }}
                    />
                </div>
                <DialogHeader className="pb-2">
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                        Tema Seç
                    </DialogTitle>
                </DialogHeader>
                <div
                    className="space-y-6 py-2"
                    role="group"
                    aria-label="Tema Kategorileri"
                >
                    <section aria-labelledby="base-themes-title">
                        <h3
                            id="base-themes-title"
                            className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-4 flex items-center gap-2"
                        >
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                            {themeCategories.base}
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                        </h3>
                        <div className="flex justify-center gap-6" role="list">
                            <div role="listitem">
                                <SystemOrb
                                    currentTheme={currentTheme}
                                    onSelect={handleThemeSelect}
                                    index={0}
                                />
                            </div>
                            {groupedThemes.base.map((theme, i) => (
                                <div key={theme.name} role="listitem">
                                    <ColorOrb
                                        themeName={theme.name}
                                        label={theme.label}
                                        color={theme.color}
                                        currentTheme={currentTheme}
                                        onSelect={handleThemeSelect}
                                        index={i + 1}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section aria-labelledby="color-themes-title">
                        <h3
                            id="color-themes-title"
                            className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-4 flex items-center gap-2"
                        >
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                            {themeCategories.color}
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                        </h3>
                        <div className="grid grid-cols-6 sm:grid-cols-9 gap-4 justify-items-center" role="list">
                            {groupedThemes.color.map((theme, i) => (
                                <div key={theme.name} role="listitem">
                                    <ColorOrb
                                        themeName={theme.name}
                                        label={theme.label}
                                        color={theme.color}
                                        currentTheme={currentTheme}
                                        onSelect={handleThemeSelect}
                                        index={i}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section aria-labelledby="neutral-themes-title">
                        <h3
                            id="neutral-themes-title"
                            className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-4 flex items-center gap-2"
                        >
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                            {themeCategories.neutral}
                            <div className="h-px flex-1 bg-border/50" aria-hidden="true" />
                        </h3>
                        <div className="flex justify-center gap-6 flex-wrap" role="list">
                            {groupedThemes.neutral.map((theme, i) => (
                                <div key={theme.name} role="listitem">
                                    <ColorOrb
                                        themeName={theme.name}
                                        label={theme.label}
                                        color={theme.color}
                                        currentTheme={currentTheme}
                                        onSelect={handleThemeSelect}
                                        index={i}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    )
}
