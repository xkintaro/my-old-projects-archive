import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from '@/lib/navigation/utils';
import { LoginForm } from './login-form';

export default async function LoginPage() {
  const session = await auth();
  const locale = await getLocale();

  if (session?.user) {
    redirect(resolveRoute('profile', locale));
  }

  const registerUrl = resolveRoute('register', locale);

  return (
    <div>
      <h1>Giriş Yap</h1>
      <LoginForm />
      <hr />
      <p>
        Hesabın yok mu?{' '}
        <a href={registerUrl}>Kayıt ol</a>
      </p>
    </div>
  );
}
