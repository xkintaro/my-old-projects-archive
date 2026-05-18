import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function getUserByUsername(username: string) {
    return db.user.findUnique({
        where: { username: username.toLowerCase() },
        select: {
            id: true,
            username: true,
            name: true,
            surname: true,
            description: true,
            avatar: true,
            banner: true,
            links: true,
            createdAt: true,
            role: {
                select: {
                    code: true,
                    type: true,
                },
            },
        },
    })
}

export async function checkUserExists(username: string, email: string) {
    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() },
            ],
        },
        select: {
            username: true,
            email: true,
        },
    })

    if (!existingUser) return null

    if (existingUser.username === username.toLowerCase()) {
        return "username"
    }
    return "email"
}

async function getDefaultUserRole() {
    let role = await db.role.findFirst({
        where: {
            type: "USER",
            isActive: true,
        },
    })

    if (!role) {
        role = await db.role.create({
            data: {
                code: "user",
                type: "USER",
                isSystem: true,
                isActive: true,
            },
        })
    }

    return role
}

export async function createUser(data: {
    username: string
    email: string
    password: string
}) {
    const hashedPassword = await bcrypt.hash(data.password, 12)
    const defaultRole = await getDefaultUserRole()

    return db.user.create({
        data: {
            username: data.username.toLowerCase(),
            email: data.email.toLowerCase(),
            password: hashedPassword,
            roleId: defaultRole.id,
            isActive: true,
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    })
}
