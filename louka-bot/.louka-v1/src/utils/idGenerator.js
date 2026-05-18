const Item = require('../database/models/item.model');
const Weapon = require('../database/models/weapon.model');
const Character = require('../database/models/character.model');
const Rarity = require('../database/models/rarity.model');
const Class = require('../database/models/class.model');
const Skill = require('../database/models/skill.model');

const UserItem = require('../database/models/userItem.model');
const UserWeapon = require('../database/models/userWeapon.model');
const UserCharacter = require('../database/models/userCharacter.model');

async function generateUniqueItemId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Item.exists({ ItemId: id });
    }

    return id;
}

async function generateUniqueWeaponId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Weapon.exists({ WeaponId: id });
    }

    return id;
}

async function generateUniqueCharacterId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Character.exists({ CharacterId: id });
    }

    return id;
}

async function generateUniqueRarityId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Rarity.exists({ RarityId: id });
    }

    return id;
}

async function generateUniqueClassId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Class.exists({ ClassId: id });
    }

    return id;
}

async function generateUniqueSkillId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await Skill.exists({ SkillId: id });
    }

    return id;
}

async function generateUniqueUserItemId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await UserItem.exists({ userItemId: id });
    }

    return id;
}

async function generateUniqueUserWeaponId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await UserWeapon.exists({ userWeaponId: id });
    }

    return id;
}

async function generateUniqueUserCharacterId() {
    let id;
    let exists = true;

    while (exists) {
        id = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        exists = await UserCharacter.exists({ userCharacterId: id });
    }

    return id;
}

module.exports = {
    generateUniqueItemId,
    generateUniqueWeaponId,
    generateUniqueCharacterId,
    generateUniqueRarityId,
    generateUniqueClassId,
    generateUniqueSkillId,
    generateUniqueUserItemId,
    generateUniqueUserWeaponId,
    generateUniqueUserCharacterId
};
