const PasswordRules = {
    minLength: 8,
    maxLength: 60,
    requireUppercase: true,
    requireLowercase: true,
    requireDigit: true,
    requireSpecialChar: true,

    validatePassword(password) {
        const errors = [];

        if (password.length < this.minLength) {
            errors.push(`Şifre en az ${this.minLength} karakter olmalıdır.`);
        }
        if (password.length > this.maxLength) {
            errors.push(`Şifre en fazla ${this.maxLength} karakter olabilir.`);
        }

        if (this.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push("Şifre en az bir büyük harf içermelidir.");
        }

        if (this.requireLowercase && !/[a-z]/.test(password)) {
            errors.push("Şifre en az bir küçük harf içermelidir.");
        }

        if (this.requireDigit && !/\d/.test(password)) {
            errors.push("Şifre en az bir rakam içermelidir.");
        }

        if (this.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Şifre en az bir özel karakter içermelidir.");
        }

        return errors;
    }
};

export default PasswordRules;