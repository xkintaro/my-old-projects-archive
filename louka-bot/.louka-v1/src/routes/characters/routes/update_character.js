const express = require('express');
const router = express.Router();
const CharacterModel = require('../../../database/models/character.model');
const { getRarityList } = require('../../../database/services/rarity.service');
const { getClassList } = require('../../../database/services/class.service');

router.get('/:id', async (req, res) => {
    try {
        const characterId = req.params.id;
        const character = await CharacterModel.findOne({ characterId: Number(characterId) });
        const [rarities, classes] = await Promise.all([
            getRarityList(),
            getClassList()
        ]);

        if (!character) {
            return res.status(404).send('Character not found');
        }

        const raritiesWithSelection = rarities.map(rarity => ({
            ...rarity.toObject(),
            isSelected: rarity.rarityId.toString() === character.rarityId.toString()
        }));

        const classesWithSelection = classes.map(cls => ({
            ...cls.toObject(),
            isSelected: cls.classId.toString() === character.classId.toString()
        }));

        res.render('characters/update_character', {
            character,
            rarities: raritiesWithSelection,
            classes: classesWithSelection
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const characterId = req.params.id;
    const {
        characterIndex,
        characterName,
        characterIcon,
        characterImage,
        characterDescription,
        characterCost,
        rarityId,
        classId
    } = req.body;

    try {
        await CharacterModel.findOneAndUpdate(
            { characterId: Number(characterId) },
            {
                characterIndex,
                characterName,
                characterIcon,
                characterImage,
                characterDescription,
                characterCost,
                rarityId,
                classId
            },
            { new: true }
        );

        res.redirect('/characters');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating character');
    }
});

module.exports = router;