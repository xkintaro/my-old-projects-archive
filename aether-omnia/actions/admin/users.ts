'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth/utils';
import { ADMIN_PREFIX } from '@/config/routes';

export async function deleteUser(userId: string) {
    const currentUser = await requireAuth();
    if (currentUser.role.code !== 'god' && currentUser.role.code !== 'admin') {
        throw new Error('Yetkisiz işlem');
    }

    if (currentUser.id === userId) {
        return { success: false, message: 'Kendinizi silemezsiniz.' };
    }

    try {
        await db.user.delete({ where: { id: userId } });
        revalidatePath(`${ADMIN_PREFIX}/users`);
        return { success: true, message: 'Kullanıcı silindi.' };
    } catch (e) {
        return { success: false, message: 'Silme işlemi başarısız.' };
    }
}

export async function toggleAdminRole(userId: string, currentRoleCode: string) {
    const currentUser = await requireAuth();

    if (currentUser.role.code !== 'god') {
        return { success: false, message: 'Bunun için GOD yetkisi gerekir.' };
    }

    try {
        const targetRoleCode = currentRoleCode === 'admin' ? 'user' : 'admin';

        const role = await db.role.findUnique({ where: { code: targetRoleCode } });
        if (!role) throw new Error('Rol bulunamadı');

        await db.user.update({
            where: { id: userId },
            data: { roleId: role.id }
        });

        revalidatePath(`${ADMIN_PREFIX}/users`);
        return { success: true, message: `Kullanıcı rolü ${targetRoleCode.toUpperCase()} olarak güncellendi.` };
    } catch (e) {
        return { success: false, message: 'Rol değiştirilemedi.' };
    }
}