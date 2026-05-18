const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');
const { getCharacterById } = require('../characters/characterData');
const { hesaplaHasar } = require('../islemler/hasar');

const activeBattles = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pvp')
        .setDescription('Bir oyuncuya düello daveti gönderir.')
        .addUserOption(option =>
            option.setName('rakip')
                .setDescription('Düello yapmak istediğin oyuncu.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const challenger = interaction.user;
        const opponent = interaction.options.getUser('rakip');

        if (challenger.id === opponent.id)
            return interaction.reply({ content: '⚠️ Kendinle savaşamazsın!', ephemeral: true });
        if (opponent.bot)
            return interaction.reply({ content: '⚠️ Botlarla savaşamazsın!', ephemeral: true });
        if (activeBattles.has(challenger.id) || activeBattles.has(opponent.id))
            return interaction.reply({ content: '⚔️ Oyunculardan biri zaten aktif bir savaşta!', ephemeral: true });

        const embed_invite = new EmbedBuilder()
            .setTitle('⚔️ Düello Daveti!')
            .setColor('#FFA500')
            .setDescription(`${challenger.username}, ${opponent.username} kullanıcısını düelloya davet etti!`);

        const row_invite = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`pvp_accept_${challenger.id}_${opponent.id}`)
                .setLabel('Kabul Et')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`pvp_decline_${challenger.id}_${opponent.id}`)
                .setLabel('Reddet')
                .setStyle(ButtonStyle.Danger)
        );

        const inviteMsg = await interaction.reply({
            content: `${opponent}, sana bir düello daveti var!`,
            embeds: [embed_invite],
            components: [row_invite]
        });

        const filter_invite = i => i.user.id === opponent.id && (i.customId.startsWith('pvp_accept') || i.customId.startsWith('pvp_decline'));
        const collector_invite = inviteMsg.createMessageComponentCollector({ filter: filter_invite, time: 60000 });

        collector_invite.on('collect', async i => {
            if (i.customId.startsWith('pvp_decline')) {
                embed_invite
                    .setTitle('❌ Düello Reddedildi')
                    .setDescription(`${opponent.username} düello davetini reddetti.`)
                    .setColor('#FF0000');
                await i.update({ embeds: [embed_invite], components: [] });
                collector_invite.stop();
                return;
            }

            await i.deferUpdate();

            const [challengerData, opponentData] = await Promise.all([
                User.findOne({ userId: challenger.id }),
                User.findOne({ userId: opponent.id })
            ]);

            if (!challengerData?.equippedCharacter)
                return interaction.editReply({ content: `${challenger.username} bir karakter donatmamış!`, embeds: [], components: [] });
            if (!opponentData?.equippedCharacter)
                return interaction.editReply({ content: `${opponent.username} bir karakter donatmamış!`, embeds: [], components: [] });

            const [challengerCharDoc, opponentCharDoc] = await Promise.all([
                UserCharacter.findOne({ userId: challenger.id, userCharacterId: challengerData.equippedCharacter }),
                UserCharacter.findOne({ userId: opponent.id, userCharacterId: opponentData.equippedCharacter })
            ]);

            if (!challengerCharDoc)
                return interaction.editReply({ content: `${challenger.username} karakter verisi bulunamadı!`, embeds: [], components: [] });
            if (!opponentCharDoc)
                return interaction.editReply({ content: `${opponent.username} karakter verisi bulunamadı!`, embeds: [], components: [] });

            const player1Char = getCharacterById(challengerCharDoc.characterId);
            const player2Char = getCharacterById(opponentCharDoc.characterId);

            if (!player1Char || !player2Char)
                return interaction.editReply({ content: '❌ Karakter verileri yüklenirken hata oluştu.', embeds: [], components: [] });

            const p1 = { ...player1Char, user: challenger };
            const p2 = { ...player2Char, user: opponent };

            p1.can = p1.max_can;
            p2.can = p2.max_can;

            let currentPlayer = Math.random() < 0.5 ? p1 : p2;
            let waitingPlayer = currentPlayer === p1 ? p2 : p1;
            let round = 1;

            activeBattles.set(p1.user.id, true);
            activeBattles.set(p2.user.id, true);
            collector_invite.stop();

            const createBattleEmbed = (log = '') =>
                new EmbedBuilder()
                    .setTitle(`⚔️ ${p1.name} vs ${p2.name}`)
                    .setColor('#E74C3C')
                    .setDescription(
                        `**${p1.name}** (${p1.user.username})\n❤️ ${p1.can.toFixed(2)} / ${p1.max_can}\n\n` +
                        `**${p2.name}** (${p2.user.username})\n❤️ ${p2.can.toFixed(2)} / ${p2.max_can}\n\n${log}`
                    )
                    .setFooter({ text: `Round ${round} | Sıra: ${currentPlayer.user.username}` });

            const attackButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('pvp_attack_button')
                    .setLabel('🗡️ Saldır')
                    .setStyle(ButtonStyle.Primary)
            );

            const battleMsg = await interaction.editReply({ embeds: [createBattleEmbed()], components: [attackButton] });

            const filter_battle = btn => btn.customId === 'pvp_attack_button' && btn.user.id === currentPlayer.user.id;
            const collector_battle = battleMsg.createMessageComponentCollector({ filter: filter_battle, time: 300000 });

            collector_battle.on('collect', async btn => {
                await btn.deferUpdate();

                const dmg = hesaplaHasar(currentPlayer, waitingPlayer);
                const log = `💥 ${currentPlayer.name}, ${waitingPlayer.name}'e **${dmg.damage.toFixed(2)}** hasar verdi! ${dmg.kritik ? '**(KRİTİK!) 💥**' : ''}`;

                if (waitingPlayer.can <= 0) {
                    const winnerEmbed = new EmbedBuilder()
                        .setTitle(`🎉 Kazanan: ${currentPlayer.user.username}`)
                        .setDescription(`**${currentPlayer.name}**, **${waitingPlayer.name}**'i mağlup etti!`)
                        .setColor('#57F287')
                        .addFields({ name: 'Kalan Can', value: `${currentPlayer.can.toFixed(2)} / ${currentPlayer.max_can}` });
                    await interaction.editReply({ embeds: [winnerEmbed], components: [] });
                    collector_battle.stop('winner');
                    return;
                }

                [currentPlayer, waitingPlayer] = [waitingPlayer, currentPlayer];
                round++;

                await interaction.editReply({ embeds: [createBattleEmbed(log)], components: [attackButton] });
            });

            collector_battle.on('end', async (_, reason) => {
                activeBattles.delete(p1.user.id);
                activeBattles.delete(p2.user.id);

                if (reason !== 'winner') {
                    const timeoutEmbed = new EmbedBuilder()
                        .setTitle('⏰ Savaş Zaman Aşımına Uğradı')
                        .setDescription('Hamle yapılmadığı için savaş sona erdi.')
                        .setColor('#FEE75C');
                    await interaction.editReply({ embeds: [timeoutEmbed], components: [] });
                }
            });
        });

        collector_invite.on('end', async (_, reason) => {
            if (reason === 'time') {
                embed_invite
                    .setTitle('⏰ Davet Süresi Doldu')
                    .setDescription('Davet zamanında kabul edilmedi.')
                    .setColor('#808080');
                await interaction.editReply({ embeds: [embed_invite], components: [] });
            }
        });
    }
};
