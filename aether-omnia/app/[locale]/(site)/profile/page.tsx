import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute, getLocalizedPath } from '@/lib/navigation/utils';
import { getCurrentUser } from '@/lib/auth/utils';
import { APP_URL } from '@/config/routes';

export default async function ProfileIndexPage() {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user) {
    return (
      <div>
        <h1>Profil</h1>
        <p>Giriş yapmanız gerekiyor.</p>
        <a href={resolveRoute('login', locale)}>Giriş Yap</a>
      </div>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return (
      <div>
        <h1>Profil</h1>
        <p>Giriş yapmanız gerekiyor.</p>
        <a href={resolveRoute('login', locale)}>Giriş Yap</a>
      </div>
    );
  }

  const profilePath = getLocalizedPath('profile', locale);

  redirect(`${APP_URL}/${locale}${profilePath}/${user.username}`);
}
