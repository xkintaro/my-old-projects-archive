'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { loginAction, type LoginResult } from '@/actions/auth/login';
import { useLocale } from '@/hooks/use-locale';
import { resolveRoute } from '@/lib/navigation/utils';

const initialState: LoginResult = {
    success: false,
    message: '',
};

export function LoginForm() {
    const router = useRouter();
    const locale = useLocale();

    const [state, formAction, isPending] = useActionState(
        async (_prevState: LoginResult, formData: FormData) => {
            const result = await loginAction({
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            });
            return result;
        },
        initialState
    );

    useEffect(() => {
        if (state.success) {
            router.push(resolveRoute('profile', locale));
            router.refresh();
        }
    }, [state.success, router, locale]);

    return (
        <form action={formAction}>
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

            <button type="submit" disabled={isPending}>
                {isPending ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
        </form>
    );
}
