const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    equippedCharacter: {
        type: String,
    },
    coin: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;