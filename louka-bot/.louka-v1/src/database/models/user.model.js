const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    coin: { type: Number, default: 0 },
    lastDaily: { type: Date }
});

const User = mongoose.model('users', userSchema);

module.exports = User;