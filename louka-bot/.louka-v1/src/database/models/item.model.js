const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: { type: Number, required: true, unique: true },
    itemIndex: { type: Number, required: true, unique: true },
    itemName: { type: String, required: true },
    itemIcon: { type: String, required: true },
    itemImage: { type: String, required: true },
    itemDescription: { type: String, required: true },
    itemDate: { type: Date, default: Date.now },
    itemCost: { type: Number, required: true },
    rarityId: { type: Number, required: true }
});

const Items = mongoose.model('items', itemSchema);

module.exports = Items;
