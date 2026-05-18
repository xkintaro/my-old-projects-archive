'use client';

import React, { createContext, useContext } from 'react';
import type { GlobalDictionary, TranslateFn } from '@/types/i18n';

const I18nContext = createContext<Partial<GlobalDictionary> | null>(null);

export function I18nProvider({
    dictionary,
    children,
}: {
    dictionary: Partial<GlobalDictionary>;
    children: React.ReactNode;
}) {
    return (
        <I18nContext.Provider value={dictionary}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslate() {
    const dict = useContext(I18nContext);

    if (!dict) {
        throw new Error('useTranslate must be used within an I18nProvider');
    }

    const t: TranslateFn = (key, params) => {
        const [ns, k] = key.split('.');

        let text = (dict as any)[ns]?.[k];

        if (!text) {
            return key;
        }

        if (params && typeof text === 'string') {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
            });
        }

        return text;
    };

    return { t };
}