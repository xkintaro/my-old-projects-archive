const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
    weaponId: { type: Number, required: true, unique: true },
    weaponIndex: { type: Number, required: true, unique: true },
    weaponName: { type: String, required: true },
    weaponIcon: { type: String, required: true },
    weaponImage: { type: String, required: true },
    weaponDescription: { type: String, required: true },
    weaponCost: { type: Number, required: true },
    weaponDate: { type: Date, default: Date.now },
    rarityId: { type: Number, required: true }
});

const Weapon = mongoose.model('weapons', weaponSchema);

module.exports = Weapon;