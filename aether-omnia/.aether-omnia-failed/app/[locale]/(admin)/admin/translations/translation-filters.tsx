"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import type { TranslationScope } from "@prisma/client"

interface TranslationFiltersProps {
    currentScope?: TranslationScope
    currentSearch?: string
}

const scopes: { value: TranslationScope | "all"; label: string; color: string }[] = [
    { value: "all", label: "Tümü", color: "bg-secondary" },
    { value: "COMMON", label: "Ortak", color: "bg-blue-500/20 text-blue-500" },
    { value: "ADMIN", label: "Admin", color: "bg-purple-500/20 text-purple-500" },
    { value: "SITE", label: "Site", color: "bg-green-500/20 text-green-500" },
]

export function TranslationFilters({ currentScope, currentSearch }: TranslationFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(currentSearch || "")

    const updateFilters = useCallback((scope?: TranslationScope | "all", searchValue?: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (scope && scope !== "all") {
            params.set("scope", scope)
        } else {
            params.delete("scope")
        }

        if (searchValue) {
            params.set("search", searchValue)
        } else {
            params.delete("search")
        }

        router.push(`/admin/translations?${params.toString()}`)
    }, [router, searchParams])

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (search !== currentSearch) {
                updateFilters(currentScope, search)
            }
        }, 300)
        return () => clearTimeout(debounce)
    }, [search, currentScope, currentSearch, updateFilters])

    const handleScopeClick = (scope: TranslationScope | "all") => {
        updateFilters(scope, search)
    }

    const clearFilters = () => {
        setSearch("")
        router.push("/admin/translations")
    }

    const hasFilters = currentScope || currentSearch

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
                {scopes.map((scope) => (
                    <Badge
                        key={scope.value}
                        variant="outline"
                        className={`cursor-pointer transition-all hover:opacity-80 ${(scope.value === "all" && !currentScope) || scope.value === currentScope
                                ? scope.color + " border-current"
                                : "opacity-50"
                            }`}
                        onClick={() => handleScopeClick(scope.value)}
                    >
                        {scope.label}
                    </Badge>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Anahtar veya değer ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 w-64"
                    />
                </div>
                {hasFilters && (
                    <Button variant="ghost" size="icon" onClick={clearFilters}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    )
}
