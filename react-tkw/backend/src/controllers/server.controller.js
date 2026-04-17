const Server = require("../models/server.model");

exports.createServer = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || name.trim().length < 3) {
            return res.status(400).json({ success: false, message: "Server adı en az 3 karakter olmalı." });
        }

        const newServer = await Server.create({
            name: name.trim(),
            description: description || "",
            owner: req.user._id,
            admins: [],
            members: [req.user._id]
        });

        res.status(201).json({
            success: true,
            message: "Server başarıyla oluşturuldu.",
            server: newServer
        });
    } catch (err) {
        console.error("createServer error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getMyServers = async (req, res) => {
    try {
        const servers = await Server.find({
            $or: [
                { owner: req.user._id },
                { admins: req.user._id },
                { members: req.user._id }
            ]
        })
            .populate("owner", "username mail image")
            .populate("admins", "username mail image")
            .populate("members", "username mail image");

        res.status(200).json({ success: true, servers });
    } catch (err) {
        console.error("getMyServers error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
