const express = require('express');
const router = express.Router();
const CharacterModel = require('../../../database/models/character.model');
const UserCharacter = require('../../../database/models/userCharacter.model');

router.delete('/:id', async (req, res) => {
    try {
        const characterId = req.params.id;

        await UserCharacter.deleteMany({ characterId: Number(characterId) });

        await CharacterModel.findOneAndDelete({ characterId: Number(characterId) });

        res.send({
            success: true,
            message: 'Character deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting character',
            error: err.message
        });
    }
});

module.exports = router;