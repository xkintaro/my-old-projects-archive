const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require('discord.js');
const path = require('path');
const { getUserWeapons } = require(path.resolve(__dirname, '../../database/services/weapon.service'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weapons')
        .setDescription('Displays your weapon collection with pagination'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const weapons = await getUserWeapons(userId);

        if (!weapons.length) {
            return interaction.reply({ content: 'You don\'t own any weapons yet.', ephemeral: true });
        }

        const pageSize = 1;
        const totalPages = Math.ceil(weapons.length / pageSize);
        let currentPage = 0;

        function generateEmbed(page) {
            const start = page * pageSize;
            const end = start + pageSize;
            const weaponsOnPage = weapons.slice(start, end);
            const weapon = weaponsOnPage[0];

            const weaponImagePath = path.resolve(__dirname, `../../public/img/weapons/${weapon.weaponImage}`);

            const embed = new EmbedBuilder()
                .setColor(weapon.rarityColor || '#00AE86')
                .setTitle(`${interaction.user.username}'s Weapons`)
                .setDescription(`**Page ${page + 1}/${totalPages}** • ${weapons.length} weapons total`)
                .setImage(`attachment://${weapon.weaponImage}`)
                .addFields(
                    {
                        name: `▬▬▬▬▬▬▬▬▬▬▬ ${weapon.weaponIcon} ${weapon.weaponName} ▬▬▬▬▬▬▬▬▬▬▬▬`,
                        value: `${weapon.weaponDescription || 'No description available'}`,
                        inline: false
                    },
                    {
                        name: '▬▬▬▬▬▬▬▬▬▬▬▬ Details ▬▬▬▬▬▬▬▬▬▬▬▬',
                        value: '\u200B',
                        inline: false
                    },
                    {
                        name: '🆔 Name',
                        value: `\`\`\`${weapon.weaponName}\`\`\``,
                        inline: true
                    },
                    {
                        name: '⭐ Rarity',
                        value: `\`\`\`${weapon.rarityName}\`\`\``,
                        inline: true
                    },
                    {
                        name: '🔢 Index',
                        value: `\`\`\`#${weapon.weaponIndex}\`\`\``,
                        inline: true
                    },
                    {
                        name: '📦 Owned',
                        value: `\`\`\`x${weapon.userWeaponCount || 1}\`\`\``,
                        inline: true
                    },
                    {
                        name: '💰 Cost',
                        value: `\`\`\`${weapon.weaponCost || 0} coins\`\`\``,
                        inline: true
                    },

                )
                .setFooter({
                    text: `Weapon Collection • ${interaction.client.user.username}`,
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setTimestamp();

            return {
                embed,
                files: [
                    { attachment: weaponImagePath, name: weapon.weaponImage }
                ]
            };
        }

        const backButton = new ButtonBuilder()
            .setCustomId('back')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('⬅️')
            .setDisabled(true);

        const nextButton = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('➡️')
            .setDisabled(totalPages <= 1);

        const pageButton = new ButtonBuilder()
            .setCustomId('page')
            .setLabel(`Page 1/${totalPages}`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        let { embed: firstEmbed, files: firstFiles } = generateEmbed(currentPage);
        const row = new ActionRowBuilder().addComponents(backButton, pageButton, nextButton);

        const message = await interaction.reply({
            embeds: [firstEmbed],
            components: [row],
            files: firstFiles,
            fetchReply: true
        });

        if (totalPages <= 1) return;

        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 120000
        });

        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) {
                return i.reply({ content: 'Only the command user can interact with these buttons.', ephemeral: true });
            }

            if (i.customId === 'back') currentPage--;
            else if (i.customId === 'next') currentPage++;

            backButton.setDisabled(currentPage === 0);
            nextButton.setDisabled(currentPage === totalPages - 1);
            pageButton.setLabel(`Page ${currentPage + 1}/${totalPages}`);

            let { embed, files } = generateEmbed(currentPage);

            await i.update({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(backButton, pageButton, nextButton)],
                files
            });
        });

        collector.on('end', async () => {
            backButton.setDisabled(true);
            nextButton.setDisabled(true);
            pageButton.setDisabled(true);
            await message.edit({
                components: [new ActionRowBuilder().addComponents(backButton, pageButton, nextButton)]
            });
        });
    }
};