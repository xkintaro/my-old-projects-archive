'use client';

import { useRouter } from 'next/navigation';
import { logoutAction } from '@/actions/auth/logout';
import { useLocale } from '@/hooks/use-locale';
import { resolveRoute } from '@/lib/navigation/utils';

export function LogoutButton() {
    const router = useRouter();
    const locale = useLocale();

    const handleLogout = async () => {
        await logoutAction();
        router.push(resolveRoute('login', locale));
        router.refresh();
    };

    return (
        <form action={handleLogout}>
            <button type="submit">Çıkış Yap</button>
        </form>
    );
}
