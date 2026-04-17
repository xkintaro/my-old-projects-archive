const Tag = require('../models/tag.model');

exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find().sort({ name: 1 });
        res.json(tags);
    } catch (err) {
        res.status(500).json({ message: 'Tagler alınırken hata oluştu', error: err.message });
    }
};

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({ message: 'Tag adı gerekli' });
        }

        const newTag = new Tag({ name });
        await newTag.save();

        res.status(201).json(newTag);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Bu tag zaten mevcut' });
        }
        res.status(500).json({ message: 'Tag oluşturulurken hata oluştu', error: err.message });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedTag = await Tag.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag bulunamadı' });
        }

        res.json(updatedTag);
    } catch (err) {
        res.status(500).json({ message: 'Tag güncellenirken hata oluştu', error: err.message });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTag = await Tag.findByIdAndDelete(id);

        if (!deletedTag) {
            return res.status(404).json({ message: 'Tag bulunamadı' });
        }

        res.json({ message: 'Tag başarıyla silindi' });
    } catch (err) {
        res.status(500).json({ message: 'Tag silinirken hata oluştu', error: err.message });
    }
};
