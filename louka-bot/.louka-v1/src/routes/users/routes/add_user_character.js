const express = require('express');
const router = express.Router();

const UserCharacter = require('../../../database/models/userCharacter.model');
const Character = require('../../../database/models/character.model');
const { generateUniqueUserCharacterId } = require('../../../utils/idGenerator');

router.get('/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const characters = await Character.find({});

        res.render('users/add_user_character', {
            userId,
            characters
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading character add form');
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const characterId = Number(req.body.characterId);
        const count = Number(req.body.count) || 1;

        for (let i = 0; i < count; i++) {
            const userCharacterId = await generateUniqueUserCharacterId();

            await UserCharacter.create({
                userCharacterId,
                userId,
                characterId,
                characterLevel: 0,
                characterXp: 0,
                characterStatPoint: 0,
                characterUsedStatPoint: 0
            });
        }

        res.redirect(`/users/user_characters/${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding user character');
    }
});

module.exports = router;