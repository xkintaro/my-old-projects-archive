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
import { Pencil, Trash2, Globe, Check, X } from "lucide-react"
import Link from "next/link"
import { deleteLanguage } from "@/lib/actions/language"
import { toast } from "sonner"
import type { Language } from "@prisma/client"

interface LanguageWithCount extends Language {
    _count: {
        staticTranslations: number
    }
}

interface LanguagesTableProps {
    languages: LanguageWithCount[]
}

export function LanguagesTable({ languages }: LanguagesTableProps) {
    const [deleteCode, setDeleteCode] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!deleteCode) return
        setIsDeleting(true)

        try {
            const result = await deleteLanguage(deleteCode)

            if (result.success) {
                toast.success("Dil başarıyla silindi.")
            }
        } catch (error: any) {
            toast.error(error.message || "Dil silinirken bir hata oluştu.")
        }

        setIsDeleting(false)
        setDeleteCode(null)
    }

    return (
        <>
            <div className="rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Bayrak</TableHead>
                            <TableHead className="w-[100px]">Kod</TableHead>
                            <TableHead>Ad</TableHead>
                            <TableHead className="w-[100px] text-center">Yön</TableHead>
                            <TableHead className="w-[100px] text-center">Varsayılan</TableHead>
                            <TableHead className="w-[100px] text-center">Site</TableHead>
                            <TableHead className="w-[100px] text-center">Admin</TableHead>
                            <TableHead className="w-[120px] text-center">Çeviriler</TableHead>
                            <TableHead className="w-[100px] text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {languages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                                    Henüz dil eklenmemiş.
                                </TableCell>
                            </TableRow>
                        ) : (
                            languages.map((lang) => (
                                <TableRow key={lang.code}>
                                    <TableCell>
                                        <span className="text-2xl">{lang.flag || "🌐"}</span>
                                    </TableCell>
                                    <TableCell>
                                        <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                                            {lang.code}
                                        </code>
                                    </TableCell>
                                    <TableCell className="font-medium">{lang.name}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="uppercase">
                                            {lang.direction}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {lang.isDefault ? (
                                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {lang.isActivePublic ? (
                                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {lang.isActiveAdmin ? (
                                            <Check className="h-4 w-4 text-green-500 mx-auto" />
                                        ) : (
                                            <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary">
                                            {lang._count.staticTranslations}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/languages/${lang.code}/edit`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={() => setDeleteCode(lang.code)}
                                                disabled={lang.isDefault}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteCode} onOpenChange={() => setDeleteCode(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Dili Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu dili silmek istediğinizden emin misiniz? Bu işlem geri alınamaz
                            ve bu dile ait tüm çeviriler de silinecektir.
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
