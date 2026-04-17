const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const uploadDir = process.env.USER_PROFILES_DIR;

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ success: false, message: "Kullanıcı bilgileri alınamadı." });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Kullanıcı mevcut değil." });
    }

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "Kullanıcı mevcut değil." });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ success: false, message: "Hata." });
    }
};

exports.updateUserImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Lütfen bir resim yükleyin." });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        if (user.image && !user.image.startsWith("default/")) {
            const oldPath = path.join(uploadDir, path.basename(user.image));
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
        }

        user.image = req.file.filename;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Profil resmi güncellendi.",
            image: user.image
        });
    } catch (err) {
        console.error("updateUserImage error:", err);
        res.status(500).json({ success: false, message: err.message || "Profil resmi güncellenemedi." });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, mail, description, password, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        let hasChanges = false;

        if (newPassword) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: "Mevcut şifreniz yanlış." });
            }

            user.password = newPassword;
            hasChanges = true;
        }

        if (username && user.username !== username) {
            user.username = username;
            hasChanges = true;
        }
        if (mail && user.mail !== mail) {
            user.mail = mail;
            hasChanges = true;
        }
        if (description !== undefined && user.description !== description) {
            user.description = description;
            hasChanges = true;
        }

        if (!hasChanges) {
            return res.status(200).json({ success: false, message: "Kaydedilecek bir değişiklik bulunamadı." });
        }

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Profiliniz başarıyla güncellendi.",
            user: userResponse
        });

    } catch (err) {
        console.error("Update User Error:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: err.message });
        }
        res.status(500).json({ success: false, message: "Sunucu hatası oluştu." });
    }
};