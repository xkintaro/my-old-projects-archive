const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");

const userImageDir = process.env.USER_PROFILES_DIR;

const userImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, userImageDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = `user_${req.user?._id}_${Date.now()}${ext}`;
        cb(null, filename);
    }
});

const userImageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Sadece görüntü dosyaları yüklenebilir."));
    }
};

const userImageUpload = multer({
    storage: userImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: userImageFilter
});

const userImageControl = (req, res, next) => {
    userImageUpload.single("image")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "Maksimum dosya boyutu 5MB olabilir."
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

const usernameValidation = async (req, res, next) => {
    try {
        if (!req.body.username) {
            return next();
        }

        const { username } = req.body;
        const loggedInUser = req.user;

        if (loggedInUser && loggedInUser.username === username) {
            return next();
        }

        const trimmedUsername = username.trim();

        if (trimmedUsername.length < 5) return res.status(400).json({ field: "username", success: false, message: "Kullanıcı adı en az 5 karakter olmalıdır." });
        if (trimmedUsername.length > 14) return res.status(400).json({ field: "username", success: false, message: "Kullanıcı adı en fazla 14 karakter olabilir." });

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(trimmedUsername)) return res.status(400).json({ field: "username", success: false, message: "Kullanıcı adı yalnızca harf, rakam ve alt çizgi (_) içerebilir." });

        const query = { username: trimmedUsername };
        if (loggedInUser) {
            query._id = { $ne: loggedInUser._id };
        }

        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(400).json({ field: "username", success: false, message: "Bu kullanıcı adı alınmış." });
        }

        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Sunucu hatası (username validation)", error: err.message });
    }
};

const mailValidation = async (req, res, next) => {
    try {
        if (!req.body.mail) {
            return next();
        }

        const { mail } = req.body;
        const loggedInUser = req.user;

        if (loggedInUser && loggedInUser.mail === mail) {
            return next();
        }

        const trimmedMail = mail.trim().toLowerCase();

        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!mailRegex.test(trimmedMail)) return res.status(400).json({ field: "mail", success: false, message: "Geçerli bir e-posta adresi girin." });

        const query = { mail: trimmedMail };
        if (loggedInUser) {
            query._id = { $ne: loggedInUser._id };
        }

        const existingMail = await User.findOne(query);
        if (existingMail) {
            return res.status(400).json({ field: "mail", success: false, message: "Bu e-posta zaten kullanımda." });
        }

        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Sunucu hatası (email validation)", error: err.message });
    }
};

const passwordValidation = (req, res, next) => {
    try {
        const passwordToValidate = req.body.newPassword || req.body.password;

        if (!passwordToValidate) {
            return next();
        }

        if (passwordToValidate.length < 6) return res.status(400).json({ field: "password", success: false, message: "Şifre en az 6 karakter olmalıdır." });
        if (passwordToValidate.length > 30) return res.status(400).json({ field: "password", success: false, message: "Şifre en fazla 30 karakter olabilir." });

        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Sunucu hatası (password validation)", error: err.message });
    }
};

const descriptionValidation = async (req, res, next) => {
    try {
        if (req.body.description === undefined) {
            return next();
        }

        const { description } = req.body;
        const trimmedDescription = description.trim();

        if (trimmedDescription.length > 120) {
            return res.status(400).json({ field: "description", success: false, message: "Hakkımda yazısı fazla 120 karakter olabilir." });
        }

        next();
    } catch (err) {
        res.status(500).json({ success: false, message: "Sunucu hatası (description validation)", error: err.message });
    }
};

module.exports = {
    userImageControl,
    usernameValidation,
    mailValidation,
    passwordValidation,
    descriptionValidation,
};