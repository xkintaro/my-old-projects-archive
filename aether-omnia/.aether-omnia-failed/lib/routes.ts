
// ==============================================================================
// ROTA ANAHTARLARI (ROUTE KEYS)
// ==============================================================================
// Buradaki anahtarlar, veritabanındaki 'key' alanlarıyla BİREBİR aynı olmalıdır.
// Bu dosya sayesinde kod yazarken 'alias("loogin")' gibi hatalar yapmazsın.

export const ROUTE_KEYS = {
    // COMMON (Herkes)
    home: 'home',
    login: 'login',
    register: 'register',
    profile: 'profile', // Dinamik: /profil/ahmet

    // ADMIN
    dashboard: 'dashboard',
    users: 'users',
    languages: 'languages',
    translations: 'translations',

    // SITE
    about: 'about',
    contact: 'contact',
} as const;

export type RouteKey = keyof typeof ROUTE_KEYS;