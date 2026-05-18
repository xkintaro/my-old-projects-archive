const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema({
    currentItems: [{ type: Number }],
    lastRefresh: { type: Date, default: Date.now }
});

const ShopItem = mongoose.model('shopitems', shopItemSchema);

module.exports = ShopItem;
