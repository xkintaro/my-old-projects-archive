import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { loginSchema } from '@/lib/auth/schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const validated = loginSchema.safeParse(credentials);

                if (!validated.success) {
                    return null;
                }

                const { email, password } = validated.data;

                const user = await db.user.findUnique({
                    where: { email },
                    include: {
                        role: true,
                    },
                });

                if (!user || !user.isActive) {
                    return null;
                }

                const isPasswordValid = await compare(password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                await db.user.update({
                    where: { id: user.id },
                    data: {
                        lastLoginAt: new Date(),
                    },
                });

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name || user.username,
                    username: user.username,
                    role: user.role.code,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
});
