const express = require('express');
const router = express.Router();
const CharacterModel = require('../../../database/models/character.model');
const { generateUniqueCharacterId } = require('../../../utils/idGenerator');
const { getRarityList } = require('../../../database/services/rarity.service');
const { getClassList } = require('../../../database/services/class.service');

router.get('/', async (req, res) => {
    try {
        const [rarities, classes] = await Promise.all([
            getRarityList(),
            getClassList()
        ]);
        res.render('characters/add_character', { rarities, classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading form');
    }
});

router.post('/', async (req, res) => {
    const {
        characterIndex,
        characterName,
        characterIcon,
        characterImage,
        characterDescription,
        characterCost,
        rarityId,
        classId,
        characterStats
    } = req.body;

    try {
        const newUniqueId = await generateUniqueCharacterId();

        const newCharacter = new CharacterModel({
            characterId: parseInt(newUniqueId),
            characterIndex,
            characterName,
            characterIcon,
            characterImage,
            characterDescription,
            characterCost,
            rarityId,
            classId,
            characterStats
        });

        await newCharacter.save();
        res.redirect('/characters');
    } catch (err) {
        console.error(err);
        res.status(500).send('Bir hata oluştu.');
    }
});

module.exports = router;