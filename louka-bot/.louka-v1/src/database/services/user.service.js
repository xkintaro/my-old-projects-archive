const User = require('../models/user.model');
const UserItem = require('../models/userItem.model');
const Item = require('../models/item.model');

async function isUserRegistered(userId) {
    const user = await User.findOne({ userId });
    return !!user;
}

async function registerUser(userId, username) {
    const existing = await User.findOne({ userId });
    if (existing) return null;

    const user = new User({ userId, username });
    await user.save();

    const starterItem = await Item.findOne({ itemIndex: 1 });
    if (!starterItem) throw new Error("Başlangıç eşyası bulunamadı");

    let userItem = await UserItem.findOne({ userId, itemId: starterItem.itemId });

    if (userItem) {
        userItem.userItemCount += 1;
        await userItem.save();
    } else {
        userItem = new UserItem({
            userId,
            itemId: starterItem.itemId
        });
        await userItem.save();
    }

    return user;
}

async function getUserList() {
    return await User.find({});
}

module.exports = { isUserRegistered, registerUser, getUserList };