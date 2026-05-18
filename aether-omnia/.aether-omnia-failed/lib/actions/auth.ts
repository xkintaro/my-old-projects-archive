"use server"

import { signIn } from "@/auth"
import { loginSchema, registerSchema } from "@/lib/validations/auth"
import { checkUserExists, createUser } from "@/lib/actions/user"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { db } from "@/lib/db"
import { cookies } from "next/headers"
import { getFullRoute } from "@/lib/i18n/server-routes"

export interface LoginState {
    error?: string
    success?: boolean
    fields?: {
        email?: string
    }
}

export interface RegisterState {
    error?: string
    fieldError?: "username" | "email" | "password" | "confirmPassword"
    success?: boolean
    fields?: {
        username?: string
        email?: string
    }
}

const ERROR_MESSAGES = {
    CREDENTIALS: "E-posta veya şifre hatalı",
    VALIDATION: "Geçersiz giriş bilgileri",
    GENERIC: "Bir hata oluştu. Lütfen tekrar deneyin.",
    USERNAME_EXISTS: "Bu kullanıcı adı zaten kullanılıyor",
    EMAIL_EXISTS: "Bu e-posta adresi zaten kayıtlı",
} as const

export async function loginAction(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const rawData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const validation = loginSchema.safeParse(rawData)

    if (!validation.success) {
        const firstError = validation.error.issues[0]?.message
        return {
            error: firstError ?? ERROR_MESSAGES.VALIDATION,
            fields: { email: rawData.email }
        }
    }

    const user = await db.user.findUnique({
        where: { email: validation.data.email.toLowerCase() },
        select: { username: true }
    })

    try {
        const cookieStore = await cookies()
        const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
        const profileBase = await getFullRoute("profile", locale)

        await signIn("credentials", {
            email: validation.data.email,
            password: validation.data.password,
            redirectTo: user ? `${profileBase}/${user.username}` : "/",
        })

        return { success: true }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: ERROR_MESSAGES.CREDENTIALS,
                        fields: { email: rawData.email }
                    }
                default:
                    return {
                        error: ERROR_MESSAGES.GENERIC,
                        fields: { email: rawData.email }
                    }
            }
        }

        console.error("[AUTH] Beklenmeyen hata:", error)
        return {
            error: ERROR_MESSAGES.GENERIC,
            fields: { email: rawData.email }
        }
    }
}

export async function registerAction(
    _prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const rawData = {
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    const validation = registerSchema.safeParse(rawData)

    if (!validation.success) {
        const firstError = validation.error.issues[0]
        return {
            error: firstError?.message ?? ERROR_MESSAGES.VALIDATION,
            fieldError: firstError?.path[0] as RegisterState["fieldError"],
            fields: { username: rawData.username, email: rawData.email },
        }
    }

    const existingField = await checkUserExists(
        validation.data.username,
        validation.data.email
    )

    if (existingField === "username") {
        return {
            error: ERROR_MESSAGES.USERNAME_EXISTS,
            fieldError: "username",
            fields: { username: rawData.username, email: rawData.email },
        }
    }

    if (existingField === "email") {
        return {
            error: ERROR_MESSAGES.EMAIL_EXISTS,
            fieldError: "email",
            fields: { username: rawData.username, email: rawData.email },
        }
    }

    try {
        const newUser = await createUser({
            username: validation.data.username,
            email: validation.data.email,
            password: validation.data.password,
        })

        const cookieStore = await cookies()
        const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
        const profileBase = await getFullRoute("profile", locale)

        await signIn("credentials", {
            email: validation.data.email,
            password: validation.data.password,
            redirectTo: `${profileBase}/${newUser.username}`,
        })

        return { success: true }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error
        }

        if (error instanceof AuthError) {
            return { error: ERROR_MESSAGES.GENERIC }
        }

        console.error("[REGISTER] Beklenmeyen hata:", error)
        return { error: ERROR_MESSAGES.GENERIC }
    }
}
