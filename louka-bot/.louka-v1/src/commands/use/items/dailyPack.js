const User = require('../../../database/models/user.model');
const UserItem = require('../../../database/models/userItem.model');

module.exports = {
    itemIndex: 2,
    async execute(interaction, userId, item, userItem) {
        const rewardCoin = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;

        await User.findOneAndUpdate(
            { userId },
            { $inc: { coin: rewardCoin } }
        );

        if (userItem.userItemCount === 1) {
            await UserItem.deleteOne({ _id: userItem._id });
        } else {
            await UserItem.updateOne(
                { _id: userItem._id },
                { $inc: { userItemCount: -1 } }
            );
        }

        return interaction.reply({
            content: `${item.itemIcon} ${item.itemName} kullandın!\n💰 **${rewardCoin.toLocaleString()} coin** kazandın!`
        });
    }
};