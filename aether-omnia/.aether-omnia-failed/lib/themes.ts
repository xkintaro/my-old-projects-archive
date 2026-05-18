export interface Theme {
    name: string
    label: string
    color: string
    category: "base" | "color" | "neutral"
}

export const themes: Theme[] = [
    { name: "light", label: "Light", color: "#ffffff", category: "base" },
    { name: "dark", label: "Dark", color: "#0f0f0f", category: "base" },
    { name: "red", label: "Red", color: "#ef4444", category: "color" },
    { name: "orange", label: "Orange", color: "#f97316", category: "color" },
    { name: "amber", label: "Amber", color: "#f59e0b", category: "color" },
    { name: "yellow", label: "Yellow", color: "#eab308", category: "color" },
    { name: "lime", label: "Lime", color: "#84cc16", category: "color" },
    { name: "green", label: "Green", color: "#22c55e", category: "color" },
    { name: "emerald", label: "Emerald", color: "#10b981", category: "color" },
    { name: "teal", label: "Teal", color: "#14b8a6", category: "color" },
    { name: "cyan", label: "Cyan", color: "#06b6d4", category: "color" },
    { name: "sky", label: "Sky", color: "#0ea5e9", category: "color" },
    { name: "blue", label: "Blue", color: "#3b82f6", category: "color" },
    { name: "indigo", label: "Indigo", color: "#6366f1", category: "color" },
    { name: "violet", label: "Violet", color: "#8b5cf6", category: "color" },
    { name: "purple", label: "Purple", color: "#a855f7", category: "color" },
    { name: "fuchsia", label: "Fuchsia", color: "#d946ef", category: "color" },
    { name: "pink", label: "Pink", color: "#ec4899", category: "color" },
    { name: "rose", label: "Rose", color: "#f43f5e", category: "color" },
    { name: "slate", label: "Slate", color: "#64748b", category: "neutral" },
    { name: "gray", label: "Gray", color: "#6b7280", category: "neutral" },
    { name: "zinc", label: "Zinc", color: "#71717a", category: "neutral" },
    { name: "neutral", label: "Neutral", color: "#737373", category: "neutral" },
    { name: "stone", label: "Stone", color: "#78716c", category: "neutral" },
]

export const themeCategories = {
    base: "Temel",
    color: "Renkler",
    neutral: "Nötr",
} as const

export function getThemesByCategory(category: Theme["category"]) {
    return themes.filter((theme) => theme.category === category)
}

export const baseThemes = ["system", "light", "dark"] as const
