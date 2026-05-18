const express = require('express');
const router = express.Router();
const ItemModel = require('../../../database/models/item.model');
const { getRarityList } = require('../../../database/services/rarity.service');

router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await ItemModel.findOne({ itemId: Number(itemId) });
        const rarities = await getRarityList();

        if (!item) {
            return res.status(404).send('Item not found');
        }

        const currentRarityId = item.rarityId.toString();
        const raritiesWithSelection = rarities.map(rarity => ({
            ...rarity.toObject(),
            isSelected: rarity.rarityId.toString() === currentRarityId
        }));

        res.render('items/update_item', {
            item,
            rarities: raritiesWithSelection,
            currentRarityId
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const itemId = req.params.id;
    const { itemIndex, itemName, itemIcon, itemImage, itemDescription, itemCost, rarityId } = req.body;

    try {
        await ItemModel.findOneAndUpdate(
            { itemId: Number(itemId) },
            {
                itemIndex,
                itemName,
                itemIcon,
                itemImage,
                itemDescription,
                itemCost,
                rarityId
            },
            { new: true }
        );

        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating item');
    }
});

module.exports = router;