const mongoose = require('mongoose');

const shopCharacterSchema = new mongoose.Schema({
    currentCharacters: [{ type: Number }],
    lastRefresh: { type: Date, default: Date.now }
});

const ShopCharacter = mongoose.model('shopcharacters', shopCharacterSchema);

module.exports = ShopCharacter;
