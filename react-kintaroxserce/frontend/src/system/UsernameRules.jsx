const UsernameRules = {
    minLength: 5,
    maxLength: 14,
    allowSpecialChars: false,
    allowUppercase: false,
    allowSpaces: false,
    allowTurkishChars: false,
    allowNumberStart: false,

    validateUsername(name) {
        let errors = [];

        if (name.length < this.minLength) {
            errors.push(`Kullanıcı adı en az ${this.minLength} karakter olmalıdır.`);
        }
        if (name.length > this.maxLength) {
            errors.push(`Kullanıcı adı en fazla ${this.maxLength} karakter olabilir.`);
        }

        if (!this.allowSpaces && /\s/.test(name)) {
            errors.push("Boşluk karakteri kullanılamaz.");
        }

        if (!this.allowSpecialChars && /[^a-z0-9_]/.test(name)) {
            errors.push("Sadece küçük harf, rakam ve alt çizgi (_) kullanılabilir.");
        }

        if (!this.allowUppercase && /[A-Z]/.test(name)) {
            errors.push("Büyük harf kullanılamaz.");
        }

        if (!this.allowTurkishChars && /[çğıöşüÇĞİÖŞÜ]/.test(name)) {
            errors.push("Türkçe karakterler kullanılamaz.");
        }

        if (!this.allowNumberStart && /^[0-9]/.test(name)) {
            errors.push("Kullanıcı adı sayı ile başlayamaz.");
        }

        return errors;
    }
};

export default UsernameRules;