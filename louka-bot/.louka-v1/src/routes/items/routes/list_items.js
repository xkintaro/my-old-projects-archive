const express = require('express');
const router = express.Router();
const ItemModel = require('../../../database/models/item.model');
const Rarity = require('../../../database/models/rarity.model');

router.get('/', async (req, res) => {
    try {
        const items = await ItemModel.find().sort({ itemIndex: -1 });
        const rarities = await Rarity.find();

        const rarityMap = {};
        rarities.forEach(rarity => {
            rarityMap[rarity.rarityId] = rarity;
        });

        const itemsWithDetails = items.map(item => {
            return {
                ...item.toObject(),
                rarityName: rarityMap[item.rarityId]?.rarityName || 'Unknown',
                rarityColor: rarityMap[item.rarityId]?.rarityColor || '#ccc'
            };
        });

        res.render('items/list_items', {
            items: itemsWithDetails,
            rarities: rarities
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Itemlar listelenirken bir hata oluştu.');
    }
});

module.exports = router;