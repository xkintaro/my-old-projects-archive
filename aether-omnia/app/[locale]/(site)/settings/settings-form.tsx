'use client';

import { useActionState } from 'react';
import { updateProfile, type SettingsResult } from '@/actions/user/settings';

const initialState: SettingsResult = {
    success: false,
    message: '',
};

export function SettingsForm({ user }: { user: any }) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState);

    return (
        <form action={formAction}>
            <div style={{ marginBottom: '15px' }}>
                <label>Kullanıcı Adı (Değiştirilemez):</label><br />
                <input type="text" value={user.username} disabled style={{ backgroundColor: '#eee' }} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name">Ad:</label><br />
                <input type="text" name="name" id="name" defaultValue={user.name || ''} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="surname">Soyad:</label><br />
                <input type="text" name="surname" id="surname" defaultValue={user.surname || ''} />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description">Hakkında:</label><br />
                <textarea name="description" id="description" rows={4} defaultValue={user.description || ''} />
            </div>

            {state.message && (
                <p style={{ color: state.success ? 'green' : 'red' }}>
                    {state.message}
                </p>
            )}

            <button type="submit" disabled={isPending}>
                {isPending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
        </form>
    );
}