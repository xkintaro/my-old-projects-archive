const mongoose = require('mongoose');

const raritySchema = new mongoose.Schema({
    rarityId: { type: Number, required: true, unique: true },
    rarityIndex: { type: Number, required: true, unique: true },
    rarityName: { type: String, required: true },
    rarityIcon: { type: String, required: true },
    rarityImage: { type: String, required: true },
    rarityDate: { type: Date, default: Date.now },
    rarityColor: { type: String, required: true }
});

const Rarity = mongoose.model('rarities', raritySchema);

module.exports = Rarity;