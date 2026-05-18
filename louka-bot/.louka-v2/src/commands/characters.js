const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const UserCharacter = require('../model/user-characters.model');
const { getCharacterById } = require('../characters/characterData');
const { drawCharacterCard } = require('../utils/drawCharacterCard');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('karakterlerim')
        .setDescription('Sahip olduğun karakterleri detaylı olarak listeler.'),

    async execute(interaction) {
        const discordUserId = interaction.user.id;
        const userCharacters = await UserCharacter.find({ userId: discordUserId });

        if (userCharacters.length === 0) {
            return await interaction.reply({
                content: 'Hiç karakterin yok',
                ephemeral: true
            });
        }

        const allCharacters = userCharacters.map(c => ({
            ...c.toObject(),
            details: getCharacterById(c.characterId),
        }));

        let currentPage = 1;
        const maxPage = allCharacters.length;

        async function getCharacterCanvas(page) {
            const char = allCharacters[page - 1];
            const buffer = await drawCharacterCard(char, maxPage, page);
            return new AttachmentBuilder(buffer, { name: `character_${page}.png` });
        }

        const getButtons = (page) =>
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('prev_char')
                    .setLabel('⬅️ Önceki')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === 1),
                new ButtonBuilder()
                    .setCustomId('next_char')
                    .setLabel('Sonraki ➡️')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(page === maxPage),
            );

        const firstCanvas = await getCharacterCanvas(currentPage);
        const message = await interaction.reply({
            files: [firstCanvas],
            components: [getButtons(currentPage)],
            ephemeral: true,
            fetchReply: true
        });

        const collector = message.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 5 * 60_000
        });

        collector.on('collect', async i => {
            if (i.customId === 'prev_char' && currentPage > 1) currentPage--;
            else if (i.customId === 'next_char' && currentPage < maxPage) currentPage++;

            const canvas = await getCharacterCanvas(currentPage);
            await i.update({
                files: [canvas],
                components: [getButtons(currentPage)]
            });
        });

        collector.on('end', async () => {
            const disabled = getButtons(currentPage);
            disabled.components.forEach(b => b.setDisabled(true));
            await interaction.editReply({ components: [disabled] }).catch(() => { });
        });
    }
};