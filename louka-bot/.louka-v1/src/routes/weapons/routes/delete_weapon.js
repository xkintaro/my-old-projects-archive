const express = require('express');
const router = express.Router();
const WeaponModel = require('../../../database/models/weapon.model');
const UserWeapon = require('../../../database/models/userWeapon.model');

router.delete('/:id', async (req, res) => {
    try {
        const weaponId = req.params.id;

        await UserWeapon.deleteMany({ weaponId: Number(weaponId) });

        await WeaponModel.findOneAndDelete({ weaponId: Number(weaponId) });

        res.send({
            success: true,
            message: 'Weapon deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting weapon',
            error: err.message
        });
    }
});

module.exports = router;