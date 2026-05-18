const express = require('express');
const router = express.Router();
const RarityModel = require('../../../database/models/rarity.model');

router.get('/:id', async (req, res) => {
    try {
        const rarityId = req.params.id;
        const rarity = await RarityModel.findOne({ rarityId: Number(rarityId) });

        if (!rarity) {
            return res.status(404).send('Rarity not found');
        }

        res.render('rarities/update_rarity', {
            rarity
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const rarityId = req.params.id;
    const { rarityIndex, rarityIcon, rarityImage, rarityName, rarityColor } = req.body;

    try {
        await RarityModel.findOneAndUpdate(
            { rarityId: Number(rarityId) },
            {
                rarityIndex,
                rarityIcon,
                rarityImage,
                rarityName,
                rarityColor
            },
            { new: true }
        );

        res.redirect('/rarities');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating rarity');
    }
});

module.exports = router;