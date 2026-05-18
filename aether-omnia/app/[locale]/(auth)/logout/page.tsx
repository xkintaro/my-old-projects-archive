import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from '@/lib/navigation/utils';
import { LogoutButton } from './logout-button';

export default async function LogoutPage() {
  const session = await auth();
  const locale = await getLocale();
  const loginUrl = resolveRoute('login', locale);

  if (!session?.user) {
    redirect(loginUrl);
  }

  return (
    <div>
      <h1>Çıkış Yap</h1>
      <p>Oturumunuzu kapatmak istediğinize emin misiniz?</p>
      <LogoutButton />
    </div>
  );
}
