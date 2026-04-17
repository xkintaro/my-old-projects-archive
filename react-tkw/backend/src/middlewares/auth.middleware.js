const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUserControl = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Token gerekli." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
        }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Geçersiz veya süresi dolmuş token. Tekrar giriş yapın" });
    }
};

module.exports = {
    authUserControl,
};
