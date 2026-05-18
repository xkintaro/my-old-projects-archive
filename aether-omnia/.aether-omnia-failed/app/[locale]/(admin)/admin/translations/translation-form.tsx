"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createBulkTranslation, updateTranslation } from "@/lib/actions/translation"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import type { Language, TranslationScope } from "@prisma/client"

import { useRoute } from "@/providers/route-provider"

interface TranslationFormProps {
    mode: "create" | "edit"
    languages: Language[]
    translationKey?: string
    scope?: TranslationScope
    translationValues?: Record<string, { id: string; value: string }>
}

const scopeOptions: { value: TranslationScope; label: string; description: string }[] = [
    { value: "COMMON", label: "Ortak", description: "Hem admin hem site'de kullanılır" },
    { value: "ADMIN", label: "Admin", description: "Sadece admin panelinde" },
    { value: "SITE", label: "Site", description: "Sadece müşteri sitesinde" },
]

export function TranslationForm({
    mode,
    languages,
    translationKey,
    scope,
    translationValues
}: TranslationFormProps) {
    const router = useRouter()
    const { getLink } = useRoute()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        key: translationKey || "",
        scope: scope || ("COMMON" as TranslationScope),
        values: languages.reduce((acc, lang) => {
            acc[lang.code] = translationValues?.[lang.code]?.value || ""
            return acc
        }, {} as Record<string, string>)
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (mode === "create") {
                const form = new FormData()
                form.append("key", formData.key)
                form.append("scope", formData.scope)

                for (const [langCode, value] of Object.entries(formData.values)) {
                    form.append(`value_${langCode}`, value)
                }

                const result = await createBulkTranslation(form)

                if (result.success) {
                    toast.success("Çeviriler başarıyla oluşturuldu.")
                    router.push(getLink("translations"))
                }
            } else {
                let hasError = false
                for (const [langCode, value] of Object.entries(formData.values)) {
                    const existingId = translationValues?.[langCode]?.id
                    if (existingId && value) {
                        const form = new FormData()
                        form.append("value", value)
                        form.append("scope", formData.scope)

                        const result = await updateTranslation(existingId, form)
                        if (!result.success) {
                            hasError = true
                        }
                    }
                }

                if (!hasError) {
                    toast.success("Çeviriler başarıyla güncellendi.")
                    router.push(getLink("translations"))
                }
            }
        } catch (error: any) {
            toast.error(error.message || "Bir hata oluştu.")
        }

        setIsSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Anahtar Bilgileri</CardTitle>
                    <CardDescription>Çeviri anahtarını ve kapsamını belirleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="key">Anahtar *</Label>
                        <Input
                            id="key"
                            placeholder="common.save"
                            value={formData.key}
                            onChange={(e) => setFormData({ ...formData, key: e.target.value.toLowerCase() })}
                            disabled={mode === "edit"}
                        />
                        <p className="text-xs text-muted-foreground">
                            Nokta ile ayrılmış format kullanın (örn: auth.login_btn, sidebar.dashboard)
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="scope">Kapsam *</Label>
                        <Select
                            value={formData.scope}
                            onValueChange={(value) => setFormData({ ...formData, scope: value as TranslationScope })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {scopeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <div className="flex flex-col">
                                            <span>{option.label}</span>
                                            <span className="text-xs text-muted-foreground">{option.description}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Çeviriler</CardTitle>
                    <CardDescription>Her dil için çeviri değerini girin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {languages.map((lang) => (
                        <div key={lang.code} className="space-y-2">
                            <Label htmlFor={`value_${lang.code}`} className="flex items-center gap-2">
                                <span className="text-lg">{lang.flag}</span>
                                {lang.name}
                                {lang.isDefault && (
                                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                        Varsayılan
                                    </span>
                                )}
                            </Label>
                            <Textarea
                                id={`value_${lang.code}`}
                                placeholder={`${lang.name} çevirisi...`}
                                value={formData.values[lang.code] || ""}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    values: { ...formData.values, [lang.code]: e.target.value }
                                })}
                                rows={2}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex items-center gap-4">
                <Link href={getLink("translations")}>
                    <Button type="button" variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Geri
                    </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    {mode === "create" ? "Oluştur" : "Kaydet"}
                </Button>
            </div>
        </form>
    )
}
