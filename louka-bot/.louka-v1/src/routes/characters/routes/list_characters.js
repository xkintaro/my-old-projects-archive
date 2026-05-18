const express = require('express');
const router = express.Router();
const CharacterModel = require('../../../database/models/character.model');
const Class = require('../../../database/models/class.model');
const Rarity = require('../../../database/models/rarity.model');

router.get('/', async (req, res) => {
    try {
        const characters = await CharacterModel.find().sort({ characterIndex: -1 });
        const [classes, rarities] = await Promise.all([
            Class.find(),
            Rarity.find()
        ]);

        const classMap = {};
        classes.forEach(cls => {
            classMap[cls.classId] = cls;
        });

        const rarityMap = {};
        rarities.forEach(rarity => {
            rarityMap[rarity.rarityId] = rarity;
        });

        const charactersWithDetails = characters.map(character => {
            return {
                ...character.toObject(),
                className: classMap[character.classId]?.className || 'Unknown',
                classColor: classMap[character.classId]?.classColor || '#ccc',
                rarityName: rarityMap[character.rarityId]?.rarityName || 'Unknown',
                rarityColor: rarityMap[character.rarityId]?.rarityColor || '#ccc'
            };
        });

        res.render('characters/list_characters', {
            characters: charactersWithDetails,
            classes: classes,
            rarities: rarities
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing characters');
    }
});

module.exports = router;