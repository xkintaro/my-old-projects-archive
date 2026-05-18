const express = require('express');
const router = express.Router();
const ItemModel = require('../../../database/models/item.model');
const { generateUniqueItemId } = require('../../../utils/idGenerator');
const { getRarityList } = require('../../../database/services/rarity.service'); // Fixed typo in path

router.get('/', async (req, res) => {
    try {
        const rarities = await getRarityList();
        res.render('items/add_item', { rarities });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading form');
    }
});

router.post('/', async (req, res) => {
    const { itemIndex, itemName, itemIcon, itemImage,itemDescription, itemCost, rarityId } = req.body;

    try {
        const newUniqueId = await generateUniqueItemId();

        const newItem = new ItemModel({
            itemId: parseInt(newUniqueId),
            itemIndex,
            itemName,
            itemIcon,
            itemImage,
            itemDescription,
            itemCost,
            rarityId
        });

        await newItem.save();
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Bir hata oluştu');
    }
});

module.exports = router;