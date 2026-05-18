const fs = require('fs');
const path = require('path');
const { isUserRegistered, registerUser } = require('../service/user.service');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const commands = new Map();

function loadCommands(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            loadCommands(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            const command = require(fullPath);

            if (command.data && command.execute) {
                const wrappedCommand = {
                    ...command,
                    async execute(interaction) {
                        if (!command.skipCheck) {
                            const userId = interaction.user.id;
                            const registered = await isUserRegistered(userId);

                            if (!registered) {
                                const embed = new EmbedBuilder()
                                    .setColor('#5865F2')
                                    .setTitle('📝 Kullanıcı Sözleşmesi')
                                    .setDescription(
                                        `Merhaba ${interaction.user.username},\n\n` +
                                        `Botu kullanmadan önce kayıt olmalısın.\n` +
                                        `Aşağıdaki butona tıklayarak kabul edebilirsin.`
                                    )
                                    .setFooter({ text: 'Kayıt işlemi geri alınamaz.' });

                                const row = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder()
                                        .setCustomId('accept_terms')
                                        .setLabel('✅ Kabul Ediyorum')
                                        .setStyle(ButtonStyle.Success)
                                );

                                await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

                                const filter = i => i.customId === 'accept_terms' && i.user.id === interaction.user.id;

                                try {
                                    const confirmation = await interaction.channel.awaitMessageComponent({ filter, time: 30000 });
                                    await registerUser(interaction.user.id);

                                    await confirmation.update({
                                        embeds: [new EmbedBuilder()
                                            .setColor('#57F287')
                                            .setTitle('🎉 Kayıt Başarılı!')
                                            .setDescription('Artık tüm komutları kullanabilirsin.')
                                        ],
                                        components: []
                                    });
                                } catch {
                                    await interaction.editReply({
                                        content: '⏰ Zaman aşımı. Kayıt işlemi iptal edildi.',
                                        embeds: [],
                                        components: [],
                                        ephemeral: true
                                    });
                                }

                                return;
                            }
                        }

                        return command.execute(interaction);
                    }
                };

                commands.set(command.data.name, wrappedCommand);
            }
        }
    }
}

loadCommands(__dirname);
module.exports = commands;