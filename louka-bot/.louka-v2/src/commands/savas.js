const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');
const { getCharacterById } = require('../characters/characterData');
const { getEnemyById } = require('../characters/enemyData');
const { hesaplaHasar } = require('../islemler/hasar');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('savas')
        .setDescription('Donanmış karakterinle rastgele bir düşmana karşı savaş başlatır.'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const userDoc = await User.findOne({ userId: interaction.user.id });
            if (!userDoc) {
                return interaction.editReply('❌ Önce bir karaktere sahip olmalısın!');
            }

            if (!userDoc.equippedCharacter) {
                return interaction.editReply('⚠️ Henüz bir karakter donatmamışsın! `/karakter-tak` komutunu kullan.');
            }

            const userCharacter = await UserCharacter.findOne({
                userId: interaction.user.id,
                userCharacterId: userDoc.equippedCharacter
            });

            if (!userCharacter) {
                return interaction.editReply('❌ Donanmış karakterin verisi bulunamadı!');
            }

            const playerChar = getCharacterById(userCharacter.characterId);
            if (!playerChar) {
                return interaction.editReply('❌ Bu karakter artık mevcut değil veya silinmiş.');
            }

            const randomEnemyId = Math.floor(Math.random() * 3) + 1;
            const enemyChar = getEnemyById(randomEnemyId);
            if (!enemyChar) {
                return interaction.editReply('❌ Düşman oluşturulamadı!');
            }

            playerChar.can = playerChar.max_can;
            enemyChar.can = enemyChar.max_can;
            let round = 1;

            const embed = new EmbedBuilder()
                .setTitle('⚔️ Savaş Başladı!')
                .setColor('#ff0000')
                .setDescription(`${playerChar.name}: ${playerChar.can}/${playerChar.max_can} Can\nVS\n${enemyChar.name}: ${enemyChar.can}/${enemyChar.max_can} Can`)
                .setThumbnail(enemyChar.image)
                .setFooter({ text: `Round ${round}` });

            const attackButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('attack')
                    .setLabel('🗡️ Saldır')
                    .setStyle(ButtonStyle.Primary)
            );

            const msg = await interaction.editReply({ embeds: [embed], components: [attackButton], fetchReply: true });

            const filter = i => i.customId === 'attack' && i.user.id === interaction.user.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 300000 });

            collector.on('collect', async i => {
                let log = '';

                const dmg1 = hesaplaHasar(playerChar, enemyChar);
                log += `🗡️ ${playerChar.name} → ${enemyChar.name}: ${dmg1.damage.toFixed(2)} ${dmg1.kritik ? '(Kritik!) 💥' : ''}\n`;

                if (enemyChar.can <= 0) {
                    embed
                        .setDescription(`${playerChar.name}: ${playerChar.can.toFixed(2)}/${playerChar.max_can} Can\nVS\n${enemyChar.name}: 0/${enemyChar.max_can} Can\n\n🎉 ${playerChar.name} kazandı!`)
                        .setColor('#57F287');
                    await i.update({ embeds: [embed], components: [] });
                    collector.stop();
                    return;
                }

                const dmg2 = hesaplaHasar(enemyChar, playerChar);
                log += `⚡ ${enemyChar.name} → ${playerChar.name}: ${dmg2.damage.toFixed(2)} ${dmg2.kritik ? '(Kritik!) 💥' : ''}`;

                if (playerChar.can <= 0) {
                    embed
                        .setDescription(`${playerChar.name}: 0/${playerChar.max_can} Can\nVS\n${enemyChar.name}: ${enemyChar.can.toFixed(2)}/${enemyChar.max_can} Can\n\n💀 ${enemyChar.name} kazandı!`)
                        .setColor('#ff0000');
                    await i.update({ embeds: [embed], components: [] });
                    collector.stop();
                    return;
                }

                round++;
                embed
                    .setDescription(`${playerChar.name}: ${playerChar.can.toFixed(2)}/${playerChar.max_can} Can\nVS\n${enemyChar.name}: ${enemyChar.can.toFixed(2)}/${enemyChar.max_can} Can\n\n${log}`)
                    .setFooter({ text: `Round ${round}` });

                await i.update({ embeds: [embed], components: [attackButton] });
            });

            collector.on('end', async (_, reason) => {
                if (reason === 'time') {
                    await interaction.editReply({ content: '⏰ Savaş zaman aşımına uğradı!', components: [] });
                }
            });

        } catch (err) {
            console.error('Savaş hatası:', err);
            await interaction.editReply('⚠️ Bir hata oluştu, lütfen tekrar dene.');
        }
    }
};
