const express = require('express');
const router = express.Router();
const UserWeapon = require('../../../database/models/userWeapon.model');
const Weapon = require('../../../database/models/weapon.model');

router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const weapons = await Weapon.find({});
        res.render('users/add_user_weapon', { userId, weapons });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const weaponId = parseInt(req.body.weaponId);
    const count = parseInt(req.body.count);

    try {
        let userWeapon = await UserWeapon.findOne({ userId, weaponId });

        if (userWeapon) {
            userWeapon.userWeaponCount += count;
            await userWeapon.save();
        } else {
            userWeapon = new UserWeapon({
                userId,
                weaponId,
                userWeaponCount: count
            });
            await userWeapon.save();
        }

        res.redirect(`/users/user_weapons/${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;