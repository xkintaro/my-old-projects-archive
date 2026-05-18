const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const User = require(path.resolve(__dirname, '../../database/models/user.model'));
const UserItem = require(path.resolve(__dirname, '../../database/models/userItem.model'));
const Item = require(path.resolve(__dirname, '../../database/models/item.model'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Günlük ödülünü al.'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const username = interaction.user.username;

        let user = await User.findOne({ userId });

        if (!user) {
            return interaction.reply({ content: 'Önce kayıt olmalısın!', ephemeral: true });
        }

        const now = new Date();
        const nextDaily = new Date(user.lastDaily || 0);
        nextDaily.setDate(nextDaily.getDate() + 1);

        if (now < nextDaily) {
            const remaining = Math.ceil((nextDaily - now) / 1000 / 60);
            return interaction.reply({
                content: `Günlük ödülünü zaten aldın. Lütfen ${remaining} dakika sonra tekrar dene.`,
                ephemeral: true
            });
        }

        const dailyItem = await Item.findOne({ itemIndex: 2 });
        if (!dailyItem) {
            return interaction.reply({ content: 'Günlük ödül eşyası bulunamadı.', ephemeral: true });
        }

        let userItem = await UserItem.findOne({ userId, itemId: dailyItem.itemId });

        if (userItem) {
            userItem.userItemCount += 1;
            await userItem.save();
        } else {
            userItem = new UserItem({
                userId,
                itemId: dailyItem.itemId
            });
            await userItem.save();
        }

        user.lastDaily = now;
        await user.save();

        await interaction.reply({
            content: `🎁 ${username}, günlük ödülünü aldın: ${dailyItem.itemIcon} \`${dailyItem.itemName}\`!`,
        });
    }
};