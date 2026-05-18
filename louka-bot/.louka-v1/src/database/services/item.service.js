const UserItem = require('../models/userItem.model');
const Item = require('../models/item.model');
const Rarity = require('../models/rarity.model');

async function getUserItems(userId) {
    const userItems = await UserItem.find({ userId });

    const detailedItems = [];

    for (const ui of userItems) {
        const item = await Item.findOne({ itemId: ui.itemId });
        if (item) {
            const rarity = await Rarity.findOne({ rarityId: item.rarityId });

            detailedItems.push({
                itemId: item.itemId,
                itemIndex: item.itemIndex,
                itemName: item.itemName,
                itemDescription: item.itemDescription,
                itemIcon: item.itemIcon,
                itemImage: item.itemImage,
                itemCost: item.itemCost,
                rarityId: item.rarityId,
                rarityName: rarity ? rarity.rarityName : "Unknown",
                rarityImage: rarity ? rarity.rarityImage : null,
                rarityIcon: rarity ? rarity.rarityIcon : null,
                rarityColor: rarity ? rarity.rarityColor : null,
                userItemCount: ui.userItemCount
            });
        }
    }

    return detailedItems;
}

async function getItemList() {
    return await Item.find({});
}

module.exports = { getUserItems, getItemList };
