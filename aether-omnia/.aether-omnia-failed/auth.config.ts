import type { NextAuthConfig } from "next-auth"
import type { UserType } from "@prisma/client"

export const authConfig = {
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.name = user.name
                token.username = user.username
                token.avatar = user.avatar
                token.userType = user.userType
                token.roleId = user.roleId
                token.roleCode = user.roleCode
                token.permissions = user.permissions
            }
            return token
        },
        session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    email: token.email as string,
                    name: token.name as string | null,
                    username: token.username as string,
                    avatar: token.avatar as string | null,
                    userType: token.userType as UserType,
                    roleId: token.roleId as string,
                    roleCode: token.roleCode as string,
                    permissions: token.permissions as string[],
                }
            }
            return session
        },
        authorized({ auth }) {
            return true
        },
    },
    providers: [],
    session: { strategy: "jwt" },
} satisfies NextAuthConfig