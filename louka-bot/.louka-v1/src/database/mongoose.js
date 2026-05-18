const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('🟢 MongoDB bağlantısı başarılı.');
    } catch (error) {
        console.error('🔴 MongoDB bağlantı hatası:', error);
    }
};

const { refreshItemShop, refreshWeaponShop, refreshCharacterShop, formatDate } = require('./services/shop.service');

(async () => {
    await refreshItemShop();
    await refreshWeaponShop();
    await refreshCharacterShop();
    console.log('Shop kontrol edildi (başlangıç):', formatDate(new Date()));
})();

setInterval(async () => {
    await refreshItemShop();
    await refreshWeaponShop();
    await refreshCharacterShop();
    console.log('Shop kontrol edildi (periyodik):', formatDate(new Date()));
}, 24 * 60 * 60 * 1000);
