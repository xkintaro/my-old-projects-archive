const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require('discord.js');
const path = require('path');
const { getUserCharacters } = require(path.resolve(__dirname, '../../database/services/character.service'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('characters')
        .setDescription('Displays your character collection with pagination'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const characters = await getUserCharacters(userId);

        if (!characters.length) {
            return interaction.reply({ content: 'You don\'t own any characters yet.', ephemeral: true });
        }

        const Rarity = require(path.resolve(__dirname, '../../database/models/rarity.model'));
        const Class = require(path.resolve(__dirname, '../../database/models/class.model'));

        const rarities = await Rarity.find({});
        const rarityMap = new Map(rarities.map(r => [r.rarityId, r]));

        const classes = await Class.find({});
        const classMap = new Map(classes.map(c => [c.classId, c]));

        const pageSize = 1;
        const totalPages = Math.ceil(characters.length / pageSize);
        let currentPage = 0;

        function generateEmbed(page) {
            const start = page * pageSize;
            const end = start + pageSize;
            const charsOnPage = characters.slice(start, end);

            const character = charsOnPage[0];
            const rarity = rarityMap.get(character.rarityId);
            const klass = classMap.get(character.classId);

            const rarityColor = rarity?.rarityColor || '#00AE86';
            const characterImagePath = path.resolve(__dirname, `../../public/img/characters/${character.characterImage}`);

            const statsFields = [];
            if (character.userCharacterStats) {
                statsFields.push({
                    name: '▬▬▬▬▬▬▬▬▬▬▬▬▬ STATS ▬▬▬▬▬▬▬▬▬▬▬▬',
                    value: '\u200B',
                    inline: false
                });

                const statConfig = {
                    resolution: { name: 'Resolution', emoji: '💪', display: true },
                    patience: { name: 'Patience', emoji: '⏳', display: true },
                    hp: { name: 'HP', emoji: '❤️', display: true },
                    armor: { name: 'Armor', emoji: '🛡️', display: true },
                    magicResistance: { name: 'Magic Resist', emoji: '🌀', display: true },
                    damageReduction: { name: 'Dmg Reduct', emoji: '🔰', display: true },
                    absoluteDefense: { name: 'Abs Defense', emoji: '🛡️', display: false },
                    attackPower: { name: 'Atk Power', emoji: '⚔️', display: false },
                    magicPower: { name: 'Mag Power', emoji: '🔮', display: false },
                    armorPiercing: { name: 'Arm Pierce', emoji: '🗡️', display: false },
                    armorPenetration: { name: 'Arm Penet', emoji: '🔪', display: false },
                    magicalInfluence: { name: 'Mag Influ', emoji: '🔮', display: false },
                    speed: { name: 'Speed', emoji: '⚡', display: false },
                    criticalProbability: { name: 'Crit Chance', emoji: '🎯', display: false },
                    criticalDamage: { name: 'Crit Dmg', emoji: '💥', display: false },
                    avoidance: { name: 'Avoidance', emoji: '🌀', display: false },
                    luck: { name: 'Luck', emoji: '🍀', display: false },
                    mana: { name: 'Mana', emoji: '🔵', display: false },
                    energy: { name: 'Energy', emoji: '🟢', display: false },
                    fatigue: { name: 'Fatigue', emoji: '😴', display: false }
                };

                const stats = Object.entries(character.userCharacterStats);
                for (const [statName, userValue] of stats) {
                    const baseValue = character.baseCharacterStats?.[statName] || 0;
                    const config = statConfig[statName] || { name: statName, emoji: '▪️', display: true };

                    if (!config.display) continue;

                    let displayName = config.name;
                    if (displayName.length > 10) displayName = displayName.substring(0, 7) + '...';

                    statsFields.push({
                        name: config.emoji + ' ' + displayName,
                        value: `\`\`\`(${userValue} lvl) • ${baseValue}\`\`\``,
                        inline: true
                    });
                }

            }

            const embed = new EmbedBuilder()
                .setColor(rarityColor)
                .setTitle(`${interaction.user.username}'s Characters`)
                .setImage(`attachment://${character.characterImage}`)
                .addFields(
                    ...statsFields,
                    {
                        name: '',
                        value: '\u200B',
                        inline: false
                    },
                    {
                        name: '▬▬▬▬▬▬▬▬▬▬▬▬ DETAILS ▬▬▬▬▬▬▬▬▬▬▬▬',
                        value: '\u200B',
                        inline: false
                    },
                    {
                        name: '🆔 Name',
                        value: `\`\`\`${character?.characterName}\`\`\``,
                        inline: true
                    },
                    {
                        name: '🆔 Class',
                        value: `\`\`\`${klass?.className || 'Unknown'} ${klass?.classIcon || ''}\`\`\``,
                        inline: true
                    },
                    {
                        name: '🎖️ Rarity',
                        value: `\`\`\`${rarity?.rarityName || 'Unknown'}\`\`\``,
                        inline: true
                    },
                    {
                        name: '💰 Cost',
                        value: `\`\`\`${character.characterCost || 0} coins\`\`\``,
                        inline: true
                    },
                    {
                        name: '📊 Level',
                        value: `\`\`\`${character.characterLevel || 0}\`\`\``,
                        inline: true
                    },
                    {
                        name: '⭐ XP',
                        value: `\`\`\`${character.characterXp || 0}\`\`\``,
                        inline: true
                    },
                    {
                        name: '🔹 Stat Points',
                        value: `\`\`\`${character.characterStatPoint || 0} (${character.characterUsedStatPoint || 0} used)\`\`\``,
                        inline: true
                    },
                )
                .setFooter({
                    text: `Collection Viewer • ${interaction.client.user.username}`,
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setTimestamp();

            return {
                embed,
                files: [
                    { attachment: characterImagePath, name: character.characterImage }
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