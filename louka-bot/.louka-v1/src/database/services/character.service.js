const UserCharacter = require('../models/userCharacter.model');
const Character = require('../models/character.model');
const Class = require('../models/class.model');
const Rarity = require('../models/rarity.model');

async function getUserCharacters(userId) {
    const userCharacters = await UserCharacter.find({ userId });

    const detailedCharacters = [];

    for (const uc of userCharacters) {
        const character = await Character.findOne({ characterId: uc.characterId });
        if (character) {
            const rarity = await Rarity.findOne({ rarityId: character.rarityId });
            const charClass = await Class.findOne({ classId: character.classId });

            const baseStats = {};
            if (character.characterStats) {
                for (const [statName, statData] of Object.entries(character.characterStats)) {
                    baseStats[statName] = statData.value;
                }
            }

            detailedCharacters.push({
                userCharacterId: uc.userCharacterId,
                characterId: character.characterId,
                characterIndex: character.characterIndex,
                characterName: character.characterName,
                characterIcon: character.characterIcon,
                characterImage: character.characterImage,
                characterDescription: character.characterDescription,
                characterCost: character.characterCost,
                rarityId: character.rarityId,
                rarityName: rarity ? rarity.rarityName : "Unknown",
                rarityImage: rarity ? rarity.rarityImage : null,
                rarityIcon: rarity ? rarity.rarityIcon : null,
                rarityColor: rarity ? rarity.rarityColor : null,
                classId: character.classId,
                className: charClass ? charClass.className : "Unknown",
                classIcon: charClass ? charClass.classIcon : null,
                classColor: charClass ? charClass.classColor : null,
                characterLevel: uc.characterLevel,
                characterXp: uc.characterXp,
                characterStatPoint: uc.characterStatPoint,
                characterUsedStatPoint: uc.characterUsedStatPoint,
                userCharacterDate: uc.userCharacterDate,
                baseCharacterStats: baseStats,
                userCharacterStats: uc.userCharacterStats
            });
        }
    }

    return detailedCharacters;
}

async function getCharacterList() {
    return await Character.find({});
}

module.exports = { getUserCharacters, getCharacterList };