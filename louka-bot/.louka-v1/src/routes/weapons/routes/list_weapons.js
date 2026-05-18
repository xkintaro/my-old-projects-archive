const express = require('express');
const router = express.Router();
const WeaponModel = require('../../../database/models/weapon.model');
const Rarity = require('../../../database/models/rarity.model');

router.get('/', async (req, res) => {
    try {
        const weapons = await WeaponModel.find().sort({ weaponIndex: -1 });
        const rarities = await Rarity.find();

        const rarityMap = {};
        rarities.forEach(rarity => {
            rarityMap[rarity.rarityId] = rarity;
        });

        const weaponsWithDetails = weapons.map(weapon => {
            return {
                ...weapon.toObject(),
                rarityName: rarityMap[weapon.rarityId]?.rarityName || 'Unknown',
                rarityColor: rarityMap[weapon.rarityId]?.rarityColor || '#ccc'
            };
        });

        res.render('weapons/list_weapons', {
            weapons: weaponsWithDetails,
            rarities: rarities
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing weapons');
    }
});

module.exports = router;