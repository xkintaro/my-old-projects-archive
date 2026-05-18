import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
import { db } from "@/lib/db"
import { loginSchema } from "@/lib/validations/auth"

async function getUserByEmail(email: string) {
    return db.user.findUnique({
        where: { email: email.toLowerCase() },
        include: {
            role: {
                include: {
                    permissions: {
                        where: { isActive: true },
                    },
                },
            },
        },
    })
}

async function updateLastLogin(userId: string) {
    try {
        await db.user.update({
            where: { id: userId },
            data: { lastLoginAt: new Date() },
        })
    } catch {
        console.error("[AUTH] Son giriş bilgisi güncellenemedi:", userId)
    }
}

function formatPermissions(permissions: { resource: string; action: string }[]): string[] {
    return permissions.map((p) => `${p.resource}:${p.action}`)
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = loginSchema.safeParse(credentials)
                if (!parsed.success) {
                    return null
                }

                const { email, password } = parsed.data

                const user = await getUserByEmail(email)
                if (!user?.password) {
                    return null
                }
                const isValidPassword = await bcrypt.compare(password, user.password)
                if (!isValidPassword) {
                    return null
                }

                if (!user.isActive) {
                    return null
                }
                if (!user.role?.isActive) {
                    return null
                }

                updateLastLogin(user.id)

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name ?? user.username,
                    username: user.username,
                    avatar: user.avatar,
                    userType: user.role.type,
                    roleId: user.roleId,
                    roleCode: user.role.code,
                    permissions: formatPermissions(user.role.permissions),
                }
            },
        }),
    ],
    trustHost: true,
})
