'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/utils';
import { profileUpdateSchema, type ProfileUpdateInput } from '@/lib/auth/schemas';

export type SettingsResult = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
};

export async function updateProfile(prevState: any, formData: FormData): Promise<SettingsResult> {
    const user = await getCurrentUser();

    if (!user) {
        return { success: false, message: 'Oturum açmanız gerekiyor.' };
    }

    const rawData: ProfileUpdateInput = {
        name: formData.get('name') as string,
        surname: formData.get('surname') as string,
        description: formData.get('description') as string,
    };

    const validated = profileUpdateSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            message: 'Geçersiz veriler.',
            errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
        };
    }

    try {
        await db.user.update({
            where: { id: user.id },
            data: validated.data,
        });

        revalidatePath('/profile');
        revalidatePath('/settings');
        
        return { success: true, message: 'Profil başarıyla güncellendi.' };
    } catch (error) {
        console.error('Update error:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}