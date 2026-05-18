const express = require('express');
const router = express.Router();
const weaponService = require('../../../database/services/weapon.service');

router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const weapons = await weaponService.getUserWeapons(userId);
        res.render('users/list_user_weapons', { userId, weapons });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;