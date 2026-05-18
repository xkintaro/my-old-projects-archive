import { getLanguageByCode } from "@/lib/actions/language"
import { LanguageForm } from "../../language-form"
import { notFound } from "next/navigation"

interface EditLanguagePageProps {
    params: Promise<{ code: string }>
}

export default async function EditLanguagePage({ params }: EditLanguagePageProps) {
    const { code } = await params
    const result = await getLanguageByCode(code)

    if (!result.success || !result.data) {
        notFound()
    }

    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Dili Düzenle</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    <span className="font-medium">{result.data.name}</span> dilinin ayarlarını güncelleyin
                </p>
            </div>

            <LanguageForm mode="edit" language={result.data} />
        </div>
    )
}
