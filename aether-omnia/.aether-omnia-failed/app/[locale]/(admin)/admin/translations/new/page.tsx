import { getLanguages } from "@/lib/actions/language"
import { TranslationForm } from "../translation-form"

export default async function NewTranslationPage() {
    const result = await getLanguages()
    const languages = result.success ? result.data : []

    return (
        <div className="p-6 space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Yeni Çeviri Ekle</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Tüm diller için yeni bir çeviri anahtarı oluşturun
                </p>
            </div>

            <TranslationForm mode="create" languages={languages || []} />
        </div>
    )
}
