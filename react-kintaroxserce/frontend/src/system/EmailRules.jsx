const EmailRules = {
    validateEmail(email) {
        let errors = [];

        if (!email.trim()) {
            errors.push("E-posta adresi boş bırakılamaz.");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            errors.push("Geçerli bir e-posta adresi girin.");
        }

        if (/\s/.test(email)) {
            errors.push("E-posta adresi boşluk içeremez.");
        }

        return errors;
    }
};

export default EmailRules;
