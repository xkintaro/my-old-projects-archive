import { getLanguages } from "@/lib/actions/language"
import { getTranslations } from "@/lib/actions/translation"
import { TranslationForm } from "../../translation-form"
import { notFound } from "next/navigation"

interface EditTranslationPageProps {
    params: Promise<{ key: string }>
}

export default async function EditTranslationPage({ params }: EditTranslationPageProps) {
    const { key } = await params
    const decodedKey = decodeURIComponent(key)

    const [translationsResult, languagesResult] = await Promise.all([
        getTranslations({ search: decodedKey }),
        getLanguages()
    ])

    if (!translationsResult.success || !translationsResult.data) {
        notFound()
    }

    const exactTranslations = translationsResult.data.filter(t => t.key === decodedKey)

    if (exactTranslations.length === 0) {
        notFound()
    }

    const languages = languagesResult.success ? languagesResult.data : []
    const scope = exactTranslations[0].scope

    const translationValues: Record<string, { id: string; value: string }> = {}
    for (const t of exactTranslations) {
        translationValues[t.languageCode] = { id: t.id, value: t.value }
    }

    return (
        <div className="p-6 space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Çeviriyi Düzenle</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    <code className="bg-muted px-2 py-0.5 rounded text-foreground">{decodedKey}</code> anahtarındaki çevirileri güncelleyin
                </p>
            </div>

            <TranslationForm
                mode="edit"
                languages={languages || []}
                translationKey={decodedKey}
                scope={scope}
                translationValues={translationValues}
            />
        </div>
    )
}
