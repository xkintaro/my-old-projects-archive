'use client';

import Link from 'next/link';
import { useRoute } from '@/hooks/use-route';
import { useTranslate } from '@/lib/i18n/client';

export default function HomePage() {
  const { t } = useTranslate();

  return (
    <div>
      <h1>{t('site.home')}</h1>
      <p>Hoş geldiniz!</p>

      <hr />

      <h2>Linkler</h2>
      <ul>
        <li><Link href={useRoute('profile')}>{t('site.profile')}</Link></li>
        <li><Link href={useRoute('login')}>{t('site.login_title')}</Link></li>
        <li><Link href={useRoute('register')}>{t('site.register_title')}</Link></li>
      </ul>
    </div>
  );
}