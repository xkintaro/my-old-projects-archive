const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { getUserItems } = require(path.resolve(__dirname, '../../database/services/item.service'));
const { toSuperscript } = require(path.resolve(__dirname, '../../utils/text'));

function padCount(num) {
    return num.toString().padStart(4, '0');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('items')
        .setDescription('Kullanıcının eşyalarını listeler.'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const items = await getUserItems(userId);

        if (!items.length) {
            return interaction.reply({ content: 'Hiç eşyan yok.', ephemeral: true });
        }

        const lines = [];
        for (let i = 0; i < items.length; i += 5) {
            const group = items.slice(i, i + 5)
                .map(i => `\`${i.itemIndex}\` ${i.itemIcon}${toSuperscript(padCount(i.userItemCount))}`)
                .join('   ');
            lines.push(group);
        }

        const message = '```fix\n' + interaction.user.username + ' • Items\n```' + '\n' + lines.join('\n\n');

        await interaction.reply({ content: message });
    }
};