const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const UserItem = require(path.resolve(__dirname, '../../database/models/userItem.model'));
const Item = require(path.resolve(__dirname, '../../database/models/item.model'));
const fs = require('fs');

const itemHandlers = {};
const handlersPath = path.join(__dirname, 'items');
const handlerFiles = fs.readdirSync(handlersPath).filter(file => file.endsWith('.js'));

for (const file of handlerFiles) {
    const handler = require(path.join(handlersPath, file));
    itemHandlers[handler.itemIndex] = handler;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('use')
        .setDescription('Bir eşyayı kullanır.')
        .addIntegerOption(option =>
            option.setName('item')
                .setDescription('Kullanmak istediğin eşyanın indexi')
                .setRequired(true)
        ),

    async execute(interaction) {
        const userId = interaction.user.id;
        const itemIndex = interaction.options.getInteger('item');

        const item = await Item.findOne({ itemIndex });
        if (!item) {
            return interaction.reply({ content: 'Geçersiz item indexi.', ephemeral: true });
        }

        const userItem = await UserItem.findOne({ userId, itemId: item.itemId });
        if (!userItem || userItem.userItemCount < 1) {
            return interaction.reply({ content: `Bu eşyaya sahip değilsin: ${item.itemName}`, ephemeral: true });
        }

        const handler = itemHandlers[itemIndex];
        if (!handler) {
            return interaction.reply({ content: 'Bu eşyayı henüz kullanamazsın.', ephemeral: true });
        }

        try {
            await handler.execute(interaction, userId, item, userItem);
        } catch (error) {
            console.error(`Item ${itemIndex} kullanılırken hata:`, error);
            return interaction.reply({ content: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.', ephemeral: true });
        }
    }
};