const ShopItem = require('../models/shopItem.model');
const ShopWeapon = require('../models/shopWeapon.model');
const ShopCharacter = require('../models/shopCharacter.model');

const selectedItemIndexes = [11, 12, 13];
const selectedWeaponIndexes = [1, 2, 3];
const selectedCharacterIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

const REFRESH_INTERVAL = 24 * 60 * 60 * 1000;

function getRandomSample(arr, n) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hour}:${minute}`;
}

async function refreshItemShop(force = false) {
    let shop = await ShopItem.findOne();
    const now = Date.now();

    if (!shop) {
        shop = new ShopItem();
    } else if (!force && now - new Date(shop.lastRefresh).getTime() < REFRESH_INTERVAL) {
        console.log('Item shop henüz yenilenmedi. Son yenileme:', formatDate(shop.lastRefresh));
        return;
    }

    const available = selectedItemIndexes.filter(i => i != null);
    shop.currentItems = getRandomSample(available, 3);
    shop.lastRefresh = new Date();

    await shop.save();
    console.log('Item shop yenilendi:', shop.currentItems, 'Tarih:', formatDate(shop.lastRefresh));
}

async function refreshWeaponShop(force = false) {
    let shop = await ShopWeapon.findOne();
    const now = Date.now();

    if (!shop) {
        shop = new ShopWeapon();
    } else if (!force && now - new Date(shop.lastRefresh).getTime() < REFRESH_INTERVAL) {
        console.log('Weapon shop henüz yenilenmedi. Son yenileme:', formatDate(shop.lastRefresh));
        return;
    }

    const available = selectedWeaponIndexes.filter(i => i != null);
    shop.currentWeapons = getRandomSample(available, 3);
    shop.lastRefresh = new Date();

    await shop.save();
    console.log('Weapon shop yenilendi:', shop.currentWeapons, 'Tarih:', formatDate(shop.lastRefresh));
}

async function refreshCharacterShop(force = false) {
    let shop = await ShopCharacter.findOne();
    const now = Date.now();

    if (!shop) {
        shop = new ShopCharacter();
    } else if (!force && now - new Date(shop.lastRefresh).getTime() < REFRESH_INTERVAL) {
        console.log('Character shop henüz yenilenmedi. Son yenileme:', formatDate(shop.lastRefresh));
        return;
    }

    const available = selectedCharacterIndexes.filter(i => i != null);
    shop.currentCharacters = getRandomSample(available, 3);
    shop.lastRefresh = new Date();

    await shop.save();
    console.log('Character shop yenilendi:', shop.currentCharacters, 'Tarih:', formatDate(shop.lastRefresh));
}

async function getCurrentItemShop() {
    const shop = await ShopItem.findOne();
    return shop?.currentItems || [];
}

async function getCurrentWeaponShop() {
    const shop = await ShopWeapon.findOne();
    return shop?.currentWeapons || [];
}

async function getCurrentCharacterShop() {
    const shop = await ShopCharacter.findOne();
    return shop?.currentCharacters || [];
}

module.exports = {
    refreshItemShop,
    refreshWeaponShop,
    refreshCharacterShop,
    getCurrentItemShop,
    getCurrentWeaponShop,
    getCurrentCharacterShop,
    formatDate
};
