import { getServerTranslator, getAdminLocale } from '@/lib/i18n/server';
import { getCurrentUser } from '@/lib/auth/utils';

export default async function AdminHomePage() {
  const { t } = await getServerTranslator('admin');
  const currentLocale = await getAdminLocale();
  const user = await getCurrentUser();

  return (
    <div>
      <h1>{t('admin.dashboard')}</h1>

      <hr />

      <h2>Kullanıcı Bilgileri</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{user?.id}</td>
          </tr>
          <tr>
            <td><strong>Kullanıcı Adı:</strong></td>
            <td>{user?.username}</td>
          </tr>
          <tr>
            <td><strong>E-posta:</strong></td>
            <td>{user?.email}</td>
          </tr>
          <tr>
            <td><strong>Ad:</strong></td>
            <td>{user?.name || '-'}</td>
          </tr>
          <tr>
            <td><strong>Soyad:</strong></td>
            <td>{user?.surname || '-'}</td>
          </tr>
          <tr>
            <td><strong>Rol:</strong></td>
            <td>{user?.role.name} ({user?.role.code})</td>
          </tr>
          <tr>
            <td><strong>Kayıt Tarihi:</strong></td>
            <td>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : '-'}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <p>Mevcut Dil: <b>{currentLocale.toUpperCase()}</b></p>

      <ul>
        <li>{t('admin.users')}</li>
        <li>{t('admin.settings')}</li>
        <li><a href="/admin/users">Kullanıcı Yönetimi</a></li>
      </ul>
    </div>
  );
}