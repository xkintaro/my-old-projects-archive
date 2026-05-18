const express = require('express');
const router = express.Router();
const RarityModel = require('../../../database/models/rarity.model');

router.get('/', async (req, res) => {
    try {
        const rarities = await RarityModel.find().sort({ rarityIndex: -1 });
        res.render('rarities/list_rarities', { rarities });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing rarities');
    }
});

module.exports = router;