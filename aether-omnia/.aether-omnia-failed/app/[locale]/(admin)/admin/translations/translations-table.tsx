"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { deleteTranslationsByKey } from "@/lib/actions/translation"
import { toast } from "sonner"
import type { TranslationScope, Language } from "@prisma/client"

interface TranslationGroup {
    key: string
    scope: TranslationScope
    translations: Array<{
        id: string
        languageCode: string
        languageName: string
        languageFlag: string | null
        value: string
    }>
}

interface TranslationsTableProps {
    translations: TranslationGroup[]
    languages: Language[]
}

const scopeColors: Record<TranslationScope, string> = {
    COMMON: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    ADMIN: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    SITE: "bg-green-500/20 text-green-500 border-green-500/30",
}

const scopeLabels: Record<TranslationScope, string> = {
    COMMON: "Ortak",
    ADMIN: "Admin",
    SITE: "Site",
}

export function TranslationsTable({ translations, languages }: TranslationsTableProps) {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
    const [deleteKey, setDeleteKey] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const toggleExpand = (key: string) => {
        const newExpanded = new Set(expandedKeys)
        if (newExpanded.has(key)) {
            newExpanded.delete(key)
        } else {
            newExpanded.add(key)
        }
        setExpandedKeys(newExpanded)
    }

    const handleDelete = async () => {
        if (!deleteKey) return
        setIsDeleting(true)

        try {
            const result = await deleteTranslationsByKey(deleteKey)

            if (result.success) {
                toast.success("Çeviriler başarıyla silindi.")
            }
        } catch (error: any) {
            toast.error(error.message || "Çeviriler silinirken bir hata oluştu.")
        }

        setIsDeleting(false)
        setDeleteKey(null)
    }

    return (
        <>
            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead>Anahtar</TableHead>
                            <TableHead className="w-[100px]">Kapsam</TableHead>
                            {languages.slice(0, 3).map((lang) => (
                                <TableHead key={lang.code} className="w-[200px]">
                                    {lang.flag} {lang.name}
                                </TableHead>
                            ))}
                            <TableHead className="w-[100px] text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {translations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5 + languages.slice(0, 3).length} className="h-24 text-center text-muted-foreground">
                                    Çeviri bulunamadı.
                                </TableCell>
                            </TableRow>
                        ) : (
                            translations.map((group) => {
                                const isExpanded = expandedKeys.has(group.key)
                                return (
                                    <TableRow key={group.key} className="group">
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => toggleExpand(group.key)}
                                            >
                                                {isExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                                                {group.key}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={scopeColors[group.scope]}>
                                                {scopeLabels[group.scope]}
                                            </Badge>
                                        </TableCell>
                                        {languages.slice(0, 3).map((lang) => {
                                            const translation = group.translations.find(
                                                (t) => t.languageCode === lang.code
                                            )
                                            return (
                                                <TableCell key={lang.code}>
                                                    {translation ? (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <span className="block truncate max-w-[180px]">
                                                                        {translation.value}
                                                                    </span>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="max-w-xs">{translation.value}</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    ) : (
                                                        <span className="text-muted-foreground/50 text-sm italic">
                                                            Eksik
                                                        </span>
                                                    )}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/admin/translations/${group.key}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                                    onClick={() => setDeleteKey(group.key)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteKey} onOpenChange={() => setDeleteKey(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Çevirileri Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                            <code className="bg-muted px-1 rounded">{deleteKey}</code> anahtarına ait tüm çevirileri
                            silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Siliniyor..." : "Sil"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
