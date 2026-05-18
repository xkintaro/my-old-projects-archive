const express = require('express');
const router = express.Router();
const WeaponModel = require('../../../database/models/weapon.model');
const { generateUniqueWeaponId } = require('../../../utils/idGenerator');
const { getRarityList } = require('../../../database/services/rarity.service');

router.get('/', async (req, res) => {
    try {
        const rarities = await getRarityList();
        res.render('weapons/add_weapon', { rarities });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading form');
    }
});

router.post('/', async (req, res) => {
    const { weaponIndex, weaponName, weaponIcon, weaponImage,weaponDescription, weaponCost, rarityId } = req.body;

    try {
        const newUniqueId = await generateUniqueWeaponId();

        const newWeapon = new WeaponModel({
            weaponId: parseInt(newUniqueId),
            weaponIndex,
            weaponName,
            weaponIcon,
            weaponImage,
            weaponDescription,
            weaponCost,
            rarityId
        });

        await newWeapon.save();
        res.redirect('/weapons');
    } catch (err) {
        console.error(err);
        res.status(500).send('Bir hata oluştu');
    }
});

module.exports = router;