import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { getLocale } from '@/lib/i18n/server';
import { resolveRoute } from '@/lib/navigation/utils';

interface ProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
    const { username } = await params;
    const session = await auth();
    const locale = await getLocale();

    const user = await db.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            name: true,
            surname: true,
            description: true,
            avatar: true,
            role: {
                select: {
                    name: true,
                    code: true,
                }
            },
            createdAt: true,
        }
    });

    if (!user) {
        return (
            <div>
                <h1>Kullanıcı Bulunamadı</h1>
                <p>{username} kullanıcı adına sahip bir hesap bulunamadı.</p>
                <a href={resolveRoute('home', locale)}>Ana Sayfa</a>
            </div>
        );
    }

    const isOwnProfile = session?.user?.username === user.username;
    const logoutUrl = resolveRoute('logout', locale);

    return (
        <div>
            <h1>{user.username}</h1>

            {user.avatar && (
                <img
                    src={user.avatar}
                    alt={user.username}
                    width={100}
                    height={100}
                />
            )}

            <hr />

            <table>
                <tbody>
                    {user.name && (
                        <tr>
                            <td><strong>Ad:</strong></td>
                            <td>{user.name}</td>
                        </tr>
                    )}
                    {user.surname && (
                        <tr>
                            <td><strong>Soyad:</strong></td>
                            <td>{user.surname}</td>
                        </tr>
                    )}
                    {user.description && (
                        <tr>
                            <td><strong>Hakkında:</strong></td>
                            <td>{user.description}</td>
                        </tr>
                    )}
                    <tr>
                        <td><strong>Rol:</strong></td>
                        <td>{user.role.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Kayıt Tarihi:</strong></td>
                        <td>{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                    </tr>
                </tbody>
            </table>

            {isOwnProfile && (
                <>
                    <hr />
                    <p><em>Bu sizin profiliniz</em></p>
                    <a href={logoutUrl}>Çıkış Yap</a>
                </>
            )}
        </div>
    );
}
