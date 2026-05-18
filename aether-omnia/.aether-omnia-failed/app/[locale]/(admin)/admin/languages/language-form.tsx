"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createLanguage, updateLanguage } from "@/lib/actions/language"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import type { Language } from "@prisma/client"

import { useRoute } from "@/providers/route-provider"

interface LanguageFormProps {
    mode: "create" | "edit"
    language?: Language
}

export function LanguageForm({ mode, language }: LanguageFormProps) {
    const router = useRouter()
    const { getLink } = useRoute()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        code: language?.code || "",
        name: language?.name || "",
        flag: language?.flag || "",
        direction: language?.direction || "ltr",
        isDefault: language?.isDefault || false,
        isActivePublic: language?.isActivePublic ?? true,
        isActiveAdmin: language?.isActiveAdmin ?? true,
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const form = new FormData()
        form.append("code", formData.code)
        form.append("name", formData.name)
        form.append("flag", formData.flag)
        form.append("direction", formData.direction)
        form.append("isDefault", formData.isDefault.toString())
        form.append("isActivePublic", formData.isActivePublic.toString())
        form.append("isActiveAdmin", formData.isActiveAdmin.toString())

        try {
            const result = mode === "create"
                ? await createLanguage(form)
                : await updateLanguage(language!.code, form)

            if (result.success) {
                toast.success(mode === "create" ? "Dil başarıyla oluşturuldu." : "Dil başarıyla güncellendi.")
                router.push(getLink("languages"))
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
                    <CardTitle>Temel Bilgiler</CardTitle>
                    <CardDescription>Dil kodunu ve adını belirleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Dil Kodu *</Label>
                            <Input
                                id="code"
                                placeholder="tr"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toLowerCase() })}
                                disabled={mode === "edit"}
                                maxLength={5}
                            />
                            <p className="text-xs text-muted-foreground">
                                ISO 639-1 kodu (örn: tr, en, de)
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="flag">Bayrak Emoji</Label>
                            <Input
                                id="flag"
                                placeholder="🇹🇷"
                                value={formData.flag}
                                onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">Dil Adı *</Label>
                        <Input
                            id="name"
                            placeholder="Türkçe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="direction">Yazı Yönü</Label>
                        <Select
                            value={formData.direction}
                            onValueChange={(value) => setFormData({ ...formData, direction: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ltr">Soldan Sağa (LTR)</SelectItem>
                                <SelectItem value="rtl">Sağdan Sola (RTL)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ayarlar</CardTitle>
                    <CardDescription>Dilin aktiflik ve varsayılan durumunu belirleyin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Varsayılan Dil</Label>
                            <p className="text-xs text-muted-foreground">
                                Sistem genelinde varsayılan olarak kullanılacak dil
                            </p>
                        </div>
                        <Switch
                            checked={formData.isDefault}
                            onCheckedChange={(checked) => setFormData({ ...formData, isDefault: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Site&apos;de Aktif</Label>
                            <p className="text-xs text-muted-foreground">
                                Müşteri sitesinde bu dil seçilebilir mi?
                            </p>
                        </div>
                        <Switch
                            checked={formData.isActivePublic}
                            onCheckedChange={(checked) => setFormData({ ...formData, isActivePublic: checked })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Admin&apos;de Aktif</Label>
                            <p className="text-xs text-muted-foreground">
                                Admin panelinde bu dil seçilebilir mi?
                            </p>
                        </div>
                        <Switch
                            checked={formData.isActiveAdmin}
                            onCheckedChange={(checked) => setFormData({ ...formData, isActiveAdmin: checked })}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center gap-4">
                <Link href={getLink("languages")}>
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
