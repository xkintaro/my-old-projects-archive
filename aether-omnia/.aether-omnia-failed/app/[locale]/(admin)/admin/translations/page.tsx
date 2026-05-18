import { getTranslationsGroupedByKey } from "@/lib/actions/translation"
import { getLanguages } from "@/lib/actions/language"
import { TranslationsTable } from "./translations-table"
import { TranslationFilters } from "./translation-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { TranslationScope } from "@prisma/client"

interface TranslationsPageProps {
    searchParams: Promise<{
        scope?: TranslationScope
        search?: string
    }>
}

export default async function TranslationsPage({ searchParams }: TranslationsPageProps) {
    const params = await searchParams
    const [translationsResult, languagesResult] = await Promise.all([
        getTranslationsGroupedByKey({ scope: params.scope, search: params.search }),
        getLanguages()
    ])

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Çeviriler</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Statik metin çevirilerini yönetin
                    </p>
                </div>
                <Link href="/admin/translations/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Yeni Çeviri
                    </Button>
                </Link>
            </div>

            <TranslationFilters currentScope={params.scope} currentSearch={params.search} />

            <TranslationsTable
                translations={translationsResult.data || []}
                languages={languagesResult.data || []}
            />
        </div>
    )
}
