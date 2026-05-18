const UserWeapon = require('../models/userWeapon.model');
const Weapon = require('../models/weapon.model');
const Rarity = require('../models/rarity.model');

async function getUserWeapons(userId) {
    const userWeapons = await UserWeapon.find({ userId });

    const detailedWeapons = [];

    for (const uw of userWeapons) {
        const weapon = await Weapon.findOne({ weaponId: uw.weaponId });
        if (weapon) {
            const rarity = await Rarity.findOne({ rarityId: weapon.rarityId });

            detailedWeapons.push({
                weaponId: weapon.weaponId,
                weaponIndex: weapon.weaponIndex,
                weaponName: weapon.weaponName,
                weaponIcon: weapon.weaponIcon,
                weaponImage: weapon.weaponImage,
                weaponDescription: weapon.weaponDescription,
                weaponCost: weapon.weaponCost,
                rarityId: weapon.rarityId,
                rarityName: rarity ? rarity.rarityName : "Unknown",
                rarityImage: rarity ? rarity.rarityImage : null,
                rarityIcon: rarity ? rarity.rarityIcon : null,
                rarityColor: rarity ? rarity.rarityColor : null,
                userWeaponCount: uw.userWeaponCount
            });
        }
    }

    return detailedWeapons;
}

async function getWeaponList() {
    return await Weapon.find({});
}

module.exports = { getUserWeapons, getWeaponList };