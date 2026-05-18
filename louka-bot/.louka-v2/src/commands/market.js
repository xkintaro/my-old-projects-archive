const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Market = require('../model/market.model');
const User = require('../model/user.model');
const UserCharacter = require('../model/user-characters.model');
const { getCharacterById } = require('../characters/characterData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('Satışta olan karakterleri listeler.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });

        try {
            let marketItems = await Market.find({}).sort({ createdAt: -1 });
            if (marketItems.length === 0)
                return interaction.editReply('📭 Şu anda markette satışta karakter bulunmuyor.');

            let allItems = marketItems.map(item => {
                const charData = getCharacterById(item.characterId);
                return { ...item.toObject(), details: charData };
            });

            let maxPage = allItems.length;
            if (maxPage === 0) return interaction.editReply('📭 Şu anda markette satışta karakter bulunmuyor.');

            let currentPage = 1;

            const getMarketEmbed = (index) => {
                const item = allItems[index - 1];
                const charName = item.details ? item.details.name : `Bilinmeyen (ID: ${item.characterId})`;
                const createdAt = new Date(item.createdAt).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

                return new EmbedBuilder()
                    .setTitle(`🛒 Satışta: ${charName}`)
                    .setColor('#FFA500')
                    .setDescription(
                        `Satıcı: <@${item.userId}>\n` +
                        `Karakter ID: \`${item.userCharacterId}\`\n` +
                        `Fiyat: **${item.price} coin** 🪙\n` +
                        `Satışa Eklenme Tarihi: ${createdAt}`
                    )
                    .setFooter({ text: `Sayfa ${index} / ${maxPage} | Toplam ${maxPage} ürün` });
            };

            const getButtons = (page) => {
                const item = allItems[page - 1];
                const isOwner = item.userId === interaction.user.id;

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('prev_market')
                            .setLabel('⬅️')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === 1),
                        new ButtonBuilder()
                            .setCustomId('next_market')
                            .setLabel('➡️')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(page === maxPage)
                    );

                if (isOwner) {
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`remove_sale_${item.productId}`)
                            .setLabel('❌ Satışı Kaldır')
                            .setStyle(ButtonStyle.Danger)
                    );
                } else {
                    row.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`buy_item_${item.productId}`)
                            .setLabel(`💰 Satın Al`)
                            .setStyle(ButtonStyle.Success)
                    );
                }
                return row;
            };

            const response = await interaction.editReply({
                embeds: [getMarketEmbed(currentPage)],
                components: [getButtons(currentPage)]
            });

            const collector = response.createMessageComponentCollector({
                filter: i => i.user.id === interaction.user.id,
                time: 60000 * 5
            });

            collector.on('collect', async i => {
                try {
                    if (i.customId === 'prev_market' && currentPage > 1) {
                        currentPage--;
                    } else if (i.customId === 'next_market' && currentPage < maxPage) {
                        currentPage++;
                    } else if (i.customId.startsWith('remove_sale_')) {
                        await i.deferUpdate();
                        const productId = i.customId.split('_')[2];
                        const itemIndex = allItems.findIndex(item => item.productId === productId);
                        if (itemIndex === -1) return;

                        await Market.findOneAndDelete({ productId: productId });
                        allItems.splice(itemIndex, 1);
                        maxPage = allItems.length;
                        currentPage = Math.min(currentPage, maxPage) || 1;

                        await i.editReply({
                            content: '✅ Ürün satıştan kaldırıldı.',
                            embeds: maxPage > 0 ? [getMarketEmbed(currentPage)] : [new EmbedBuilder().setDescription('📭 Market artık boş.')],
                            components: maxPage > 0 ? [getButtons(currentPage)] : []
                        });
                        return;
                    } else if (i.customId.startsWith('buy_item_')) {
                        await i.deferUpdate();
                        const productId = i.customId.split('_')[2];

                        const marketItem = await Market.findOne({ productId: productId });
                        if (!marketItem) {
                            return i.followUp({ content: '❌ Bu ürün artık satışta değil!', ephemeral: true });
                        }

                        const buyer = await User.findOne({ userId: i.user.id });
                        const seller = await User.findOne({ userId: marketItem.userId });
                        const characterDoc = await UserCharacter.findOne({ userId: marketItem.userId, userCharacterId: marketItem.userCharacterId });

                        if (!buyer || !seller || !characterDoc) {
                            return i.followUp({ content: '❌ İşlem sırasında bir hata oluştu (satıcı veya karakter bulunamadı).', ephemeral: true });
                        }
                        if (buyer.coin < marketItem.price) {
                            return i.followUp({ content: `❌ Yeterli coinin yok! Gerekli: **${marketItem.price}** 🪙`, ephemeral: true });
                        }

                        buyer.coin -= marketItem.price;
                        seller.coin += marketItem.price;
                        characterDoc.userId = buyer.userId;

                        await Promise.all([
                            buyer.save(),
                            seller.save(),
                            characterDoc.save(),
                            Market.deleteOne({ productId: productId })
                        ]);

                        const itemIndex = allItems.findIndex(item => item.productId === productId);
                        if (itemIndex !== -1) {
                            allItems.splice(itemIndex, 1);
                        }
                        maxPage = allItems.length;
                        currentPage = Math.min(currentPage, maxPage) || 1;

                        await i.followUp({ content: `✅ **${characterDoc.details?.name || 'Karakter'}** başarıyla satın alındı! Yeni Karakter ID: \`${characterDoc.userCharacterId}\``, ephemeral: true });

                        await interaction.editReply({
                            embeds: maxPage > 0 ? [getMarketEmbed(currentPage)] : [new EmbedBuilder().setDescription('📭 Market artık boş.')],
                            components: maxPage > 0 ? [getButtons(currentPage)] : []
                        });
                        return;
                    }

                    await i.update({
                        embeds: [getMarketEmbed(currentPage)],
                        components: [getButtons(currentPage)]
                    });

                } catch (error) {
                    console.error('Market collector hatası:', error);
                    await i.followUp({ content: '⚠️ İşlem sırasında bir hata oluştu.', ephemeral: true }).catch(() => { });
                }
            });

            collector.on('end', async () => {
                try {
                    const finalComponents = response.components[0];
                    if (finalComponents) {
                        finalComponents.components.forEach(btn => btn.setDisabled(true));
                        await response.edit({ components: [finalComponents] });
                    }
                } catch (error) {
                    //
                }
            });

        } catch (err) {
            console.error('⚠️ /market komutunda hata:', err);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: '⚠️ Market listelenirken bir hata oluştu.', ephemeral: true });
            } else {
                await interaction.editReply('⚠️ Market listelenirken bir hata oluştu.');
            }
        }
    }
};