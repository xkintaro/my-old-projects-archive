const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, mail, password } = req.body;

        const newUser = await User.create({ username, mail, password });

        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const userResponse = {
            _id: newUser._id,
            username: newUser.username,
            mail: newUser.mail,
            image: newUser.image,
        };

        res.status(201).json({ message: "Kayıt başarılı", user: userResponse, token });
    } catch (err) {
        res.status(500).json({ message: "Kayıt başarısız", error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({ message: "E-posta ve şifre gerekli." });
        }

        const user = await User.findOne({ mail: mail.trim().toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Kullanıcı bulunamadı." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Şifre yanlış." });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const userResponse = {
            _id: user._id,
            username: user.username,
            mail: user.mail,
            image: user.image,
        };

        res.status(200).json({ message: "Giriş başarılı", user: userResponse, token });
    } catch (err) {
        res.status(500).json({ message: "Giriş başarısız", error: err.message });
    }
};

module.exports = {
    register,
    login,
};