import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from '@/lib/navigation/utils';
import { SettingsForm } from './settings-form';

export default async function SettingsPage() {
    const session = await auth();
    const locale = await getLocale();

    if (!session?.user) {
        redirect(resolveRoute('login', locale));
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) return null;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Hesap Ayarları</h1>
            <hr />
            <SettingsForm user={user} />
        </div>
    );
}