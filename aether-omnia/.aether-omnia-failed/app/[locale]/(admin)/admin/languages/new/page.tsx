import { LanguageForm } from "../language-form"

export default function NewLanguagePage() {
    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Yeni Dil Ekle</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Sisteme yeni bir dil ekleyin
                </p>
            </div>

            <LanguageForm mode="create" />
        </div>
    )
}
