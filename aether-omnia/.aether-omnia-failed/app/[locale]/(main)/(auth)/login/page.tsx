"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { loginAction, LoginState } from "@/lib/actions/auth"
import { AuthBackground, AuthLogo } from "@/components/features/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import { COPY_RIGHT } from "@/constants"
import { useRoute } from "@/providers/route-provider"

const initialState: LoginState = {}

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, initialState)
    const { getLink } = useRoute()

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <AuthBackground />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md"
                >
                    <AuthLogo subtitle="Yönetim Paneline Giriş" />

                    <Card className="border-border/50 bg-card/60 shadow-2xl shadow-black/5 backdrop-blur-xl transition-colors">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
                                Hoş Geldiniz
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Devam etmek için hesabınıza giriş yapın
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={formAction} className="space-y-4" noValidate>
                                {state.error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        id="form-error"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        <Alert variant="destructive" className="border-destructive/30 bg-destructive/10 text-destructive">
                                            <AlertDescription>{state.error}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                        E-posta
                                    </Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="ornek@email.com"
                                            autoComplete="email"
                                            required
                                            value={"admin@aether.com"}
                                            defaultValue={state.fields?.email}
                                            aria-invalid={!!state.error}
                                            aria-describedby={state.error ? "form-error" : undefined}
                                            disabled={isPending}
                                            className="h-11 border-input bg-background/50 pl-10 transition-all focus:border-primary focus:ring-1 focus:ring-primary/25 group-hover:border-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Şifre
                                    </Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            required
                                            value={"password123"}
                                            aria-invalid={!!state.error}
                                            aria-describedby={state.error ? "form-error" : undefined}
                                            disabled={isPending}
                                            className="h-11 border-input bg-background/50 pl-10 transition-all focus:border-primary focus:ring-1 focus:ring-primary/25 group-hover:border-primary/50"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="relative h-11 w-full overflow-hidden bg-linear-to-r from-primary to-accent font-medium text-primary-foreground shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:shadow-primary/30"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {isPending ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Giriş yapılıyor...
                                            </>
                                        ) : (
                                            "Giriş Yap"
                                        )}
                                    </div>
                                </Button>
                            </form>

                            <div className="mt-6 border-t border-border pt-4">
                                <p className="text-center text-sm text-muted-foreground">
                                    Hesabınız yok mu?{" "}
                                    <Link
                                        href={getLink("register")}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        Kayıt Ol
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.p
                        className="mt-8 text-center text-xs text-muted-foreground/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {COPY_RIGHT}
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}
