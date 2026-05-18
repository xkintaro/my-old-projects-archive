const express = require('express');
const router = express.Router();

const { getUserCharacters } = require('../../../database/services/character.service');

router.get('/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const characters = await getUserCharacters(userId);

        res.render('users/list_user_characters', {
            userId,
            characters
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading user characters');
    }
});

module.exports = router;
