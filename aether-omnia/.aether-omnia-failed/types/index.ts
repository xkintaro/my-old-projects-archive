import type { UserType } from "@prisma/client"
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        id: string
        email: string
        name: string | null
        username: string
        avatar: string | null
        userType: UserType
        roleId: string
        roleCode: string
        permissions: string[]
    }

    interface Session {
        user: User & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        email: string
        name: string | null
        username: string
        avatar: string | null
        userType: UserType
        roleId: string
        roleCode: string
        permissions: string[]
    }
}
