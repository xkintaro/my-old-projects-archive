const mongoose = require('mongoose');

const shopWeaponSchema = new mongoose.Schema({
    currentWeapons: [{ type: Number }],
    lastRefresh: { type: Date, default: Date.now }
});

const ShopWeapon = mongoose.model('shopweapons', shopWeaponSchema);

module.exports = ShopWeapon;
