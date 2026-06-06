import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/core/db";

import { users, userRoles, roles } from "@/core/db/schema";

import { eq } from "drizzle-orm";

import bcrypt from "bcryptjs";

import { hasPermission } from "./permissions";

export const { handlers, signIn, signOut, auth } = NextAuth({

    adapter: DrizzleAdapter(db),

    session: { strategy: "jwt" },

    pages: {
        signIn: "/login",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {

                    return null;
                }

                const user = await db.query.users.findFirst({
                    where: eq(users.email, credentials.email as string)
                });

                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordsMatch) return null;

                return user;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;

                const userRolesData = await db.select({
                    permissions: roles.permissions
                })
                    .from(userRoles)
                    .innerJoin(roles, eq(userRoles.roleId, roles.id))
                    .where(eq(userRoles.userId, user.id as string));

                const mergedPermissions = new Set<string>();
                userRolesData.forEach(r => {
                    r.permissions.forEach(p => mergedPermissions.add(p));
                });

                if (mergedPermissions.has("*") || mergedPermissions.has("system:god")) {
                    token.permissions = ["*"];
                } else {
                    token.permissions = Array.from(mergedPermissions);
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id;
                session.user.permissions = token.permissions;
            }
            return session;
        }
    }
});

export async function checkPermission(requiredPermission: string): Promise<string> {
    const session = await auth();

    if (!session?.user?.id) throw new Error("Giriş reddedildi.");

    const permissions = session.user.permissions || [];

    if (!hasPermission(permissions, requiredPermission)) {
        throw new Error(`Bu işlem için '${requiredPermission}' yetkisi gerekiyor.`);
    }

    return session.user.id;
}