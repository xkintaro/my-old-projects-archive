const express = require('express');
const router = express.Router();
const WeaponModel = require('../../../database/models/weapon.model');
const { getRarityList } = require('../../../database/services/rarity.service');

router.get('/:id', async (req, res) => {
    try {
        const weaponId = req.params.id;
        const weapon = await WeaponModel.findOne({ weaponId: Number(weaponId) });
        const rarities = await getRarityList();

        if (!weapon) {
            return res.status(404).send('Weapon not found');
        }

        const currentRarityId = weapon.rarityId.toString();
        const raritiesWithSelection = rarities.map(rarity => ({
            ...rarity.toObject(),
            isSelected: rarity.rarityId.toString() === currentRarityId
        }));

        res.render('weapons/update_weapon', {
            weapon,
            rarities: raritiesWithSelection
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const weaponId = req.params.id;
    const { weaponIndex, weaponName, weaponIcon, weaponImage, weaponDescription, weaponCost, rarityId } = req.body;

    try {
        await WeaponModel.findOneAndUpdate(
            { weaponId: Number(weaponId) },
            {
                weaponIndex,
                weaponName,
                weaponIcon,
                weaponImage,
                weaponDescription,
                weaponCost,
                rarityId
            },
            { new: true }
        );

        res.redirect('/weapons');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating weapon');
    }
});

module.exports = router;