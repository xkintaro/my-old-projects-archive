import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from '@/lib/navigation/utils';
import { RegisterForm } from './register-form';

export default async function RegisterPage() {
  const session = await auth();
  const locale = await getLocale();

  if (session?.user) {
    redirect(resolveRoute('profile', locale));
  }

  const loginUrl = resolveRoute('login', locale);

  return (
    <div>
      <h1>Kayıt Ol</h1>
      <RegisterForm />
      <hr />
      <p>
        Zaten hesabın var mı?{' '}
        <a href={loginUrl}>Giriş yap</a>
      </p>
    </div>
  );
}
