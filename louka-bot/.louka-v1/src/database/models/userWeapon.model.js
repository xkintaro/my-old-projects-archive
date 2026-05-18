const mongoose = require('mongoose');
const UserWeapon = mongoose.model('userweapons', new mongoose.Schema({
    userWeaponCount: {
        type: Number,
        default: 1
    },
    userWeaponDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Number,
        required: true
    },
    weaponId: {
        type: Number,
        required: true
    }
}));

module.exports = UserWeapon;
