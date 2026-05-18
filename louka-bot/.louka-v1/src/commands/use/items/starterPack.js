const User = require('../../../database/models/user.model');
const Weapon = require('../../../database/models/weapon.model');
const UserWeapon = require('../../../database/models/userWeapon.model');
const UserItem = require('../../../database/models/userItem.model');
const Character = require('../../../database/models/character.model');
const UserCharacter = require('../../../database/models/userCharacter.model');

module.exports = {
    itemIndex: 1,
    async execute(interaction, userId, item, userItem) {
        const rewardCoin = 150000;

        const weaponPool = [1, 2, 3];
        const randomWeaponIndex = weaponPool[Math.floor(Math.random() * weaponPool.length)];
        const weapon = await Weapon.findOne({ weaponIndex: randomWeaponIndex });

        if (!weapon) {
            throw new Error('Silah bulunamadı');
        }

        const characterPool = [1, 2, 3, 4, 5, 6, 7, 8];
        const randomCharacterIndex = characterPool[Math.floor(Math.random() * characterPool.length)];
        const character = await Character.findOne({ characterIndex: randomCharacterIndex });

        if (!character) {
            throw new Error('Karakter bulunamadı');
        }

        await User.findOneAndUpdate(
            { userId },
            { $inc: { coin: rewardCoin } }
        );

        const existingUserWeapon = await UserWeapon.findOne({ userId, weaponId: weapon.weaponId });
        if (existingUserWeapon) {
            await UserWeapon.updateOne(
                { _id: existingUserWeapon._id },
                { $inc: { userWeaponCount: 1 } }
            );
        } else {
            await UserWeapon.create({
                userId,
                weaponId: weapon.weaponId,
                userWeaponCount: 1
            });
        }

        const existingUserCharacter = await UserCharacter.findOne({ userId, characterId: character.characterId });
        if (existingUserCharacter) {
            await UserCharacter.updateOne(
                { _id: existingUserCharacter._id },
                { $inc: { userCharacterCount: 1 } }
            );
        } else {
            await UserCharacter.create({
                userId,
                characterId: character.characterId,
                userCharacterCount: 1
            });
        }

        if (userItem.userItemCount === 1) {
            await UserItem.deleteOne({ _id: userItem._id });
        } else {
            await UserItem.updateOne(
                { _id: userItem._id },
                { $inc: { userItemCount: -1 } }
            );
        }

        return interaction.reply({
            content: `${item.itemIcon} ${item.itemName} kullandın!\n💰 **${rewardCoin.toLocaleString()} coin** kazandın!\n⚔️ Ayrıca ${weapon.weaponIcon} **${weapon.weaponName}** kazandın!\n🧙‍♂️ Karakter olarak da ${character.characterIcon} **${character.characterName}** kazandın!`
        });
    }
};