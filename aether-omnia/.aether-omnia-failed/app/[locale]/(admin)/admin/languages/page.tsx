"use client"

import { useT, useLocale } from "@/providers/translation-provider"
import { LanguagesTable } from "./languages-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getLanguages } from "@/lib/actions/language"

export default function LanguagesPage() {
    const t = useT()
    const locale = useLocale()
    const [languages, setLanguages] = useState<Awaited<ReturnType<typeof getLanguages>>["data"]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getLanguages()
            .then(result => {
                setLanguages(result.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message || "Bir hata oluştu")
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div className="p-6">Yükleniyor...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {t("admin.languages")}
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {t("admin.languages_desc")}
                    </p>
                </div>
                <Link href={`/${locale}/admin/languages/new`}>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        {t("common.add_new", "Yeni Ekle")}
                    </Button>
                </Link>
            </div>

            {error ? (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-destructive text-sm">{error}</p>
                </div>
            ) : (
                <LanguagesTable languages={languages || []} />
            )}
        </div>
    )
}
