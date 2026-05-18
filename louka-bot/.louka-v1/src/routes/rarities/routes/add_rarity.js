const express = require('express');
const router = express.Router();
const RarityModel = require('../../../database/models/rarity.model');
const { generateUniqueRarityId } = require('../../../utils/idGenerator');

router.get('/', (req, res) => {
    res.render('rarities/add_rarity');
});

router.post('/', async (req, res) => {
    const { rarityIndex, rarityIcon, rarityImage, rarityName, rarityColor } = req.body;

    try {
        const newUniqueId = await generateUniqueRarityId();

        const newRarity = new RarityModel({
            rarityId: parseInt(newUniqueId),
            rarityIndex,
            rarityIcon,
            rarityImage,
            rarityName,
            rarityColor
        });

        await newRarity.save();
        res.redirect('/rarities');
    } catch (err) {
        console.error(err);
        res.status(500).send('Rarity eklenirken bir hata oluştu');
    }
});

module.exports = router;