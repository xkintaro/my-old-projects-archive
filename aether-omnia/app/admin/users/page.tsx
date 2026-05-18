import { db } from '@/lib/db';
import { deleteUser, toggleAdminRole } from '@/actions/admin/users';

export default async function AdminUsersPage() {
    const users = await db.user.findMany({
        include: { role: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <h1>Kullanıcı Yönetimi</h1>
            <p>Toplam Kullanıcı: {users.length}</p>
            <hr />

            <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th align="left">Kullanıcı Adı</th>
                        <th align="left">Email</th>
                        <th align="left">Rol</th>
                        <th align="left">Durum</th>
                        <th align="left">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <strong>{user.username}</strong>
                                <br />
                                <small style={{ color: '#666' }}>{user.id}</small>
                            </td>
                            <td>{user.email}</td>
                            <td>
                                <span style={{ 
                                    fontWeight: 'bold', 
                                    color: user.role.code === 'god' ? 'red' : user.role.code === 'admin' ? 'blue' : 'black' 
                                }}>
                                    {user.role.name}
                                </span>
                            </td>
                            <td>{user.isActive ? 'Aktif' : 'Pasif'}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {user.role.code !== 'god' && (
                                        <form action={toggleAdminRole.bind(null, user.id, user.role.code)}>
                                            <button type="submit">
                                                {user.role.code === 'admin' ? 'User Yap' : 'Admin Yap'}
                                            </button>
                                        </form>
                                    )}

                                    {user.role.code !== 'god' && (
                                        <form action={deleteUser.bind(null, user.id)}>
                                            <button 
                                                type="submit" 
                                                style={{ color: 'red', borderColor: 'red' }}
                                            >
                                                Sil
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}