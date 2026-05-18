const Rarity = require('../models/rarity.model');

async function getRarityList() {
    return await Rarity.find({});
}

module.exports = { getRarityList };