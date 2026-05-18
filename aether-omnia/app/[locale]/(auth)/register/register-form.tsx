'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { registerAction, type RegisterResult } from '@/actions/auth/register';
import { useLocale } from '@/hooks/use-locale';
import { resolveRoute } from '@/lib/navigation/utils';

const initialState: RegisterResult = {
    success: false,
    message: '',
};

export function RegisterForm() {
    const router = useRouter();
    const locale = useLocale();

    const [state, formAction, isPending] = useActionState(
        async (_prevState: RegisterResult, formData: FormData) => {
            const result = await registerAction({
                username: formData.get('username') as string,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            });
            return result;
        },
        initialState
    );

    useEffect(() => {
        if (state.success) {
            router.push(resolveRoute('login', locale));
        }
    }, [state.success, router, locale]);

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="username">Kullanıcı Adı:</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    disabled={isPending}
                />
                {state.errors?.username && (
                    <p style={{ color: 'red' }}>{state.errors.username[0]}</p>
                )}
            </div>

            <br />

            <div>
                <label htmlFor="email">E-posta:</label>
                <br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isPending}
                />
                {state.errors?.email && (
                    <p style={{ color: 'red' }}>{state.errors.email[0]}</p>
                )}
            </div>

            <br />

            <div>
                <label htmlFor="password">Parola:</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    disabled={isPending}
                />
                {state.errors?.password && (
                    <p style={{ color: 'red' }}>{state.errors.password[0]}</p>
                )}
            </div>

            <br />

            {state.message && !state.success && (
                <p style={{ color: 'red' }}>{state.message}</p>
            )}

            {state.message && state.success && (
                <p style={{ color: 'green' }}>{state.message}</p>
            )}

            <button type="submit" disabled={isPending}>
                {isPending ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
        </form>
    );
}
