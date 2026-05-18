const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const path = require('path');

const {
    refreshItemShop,
    refreshWeaponShop,
    refreshCharacterShop,
    getCurrentItemShop,
    getCurrentWeaponShop,
    getCurrentCharacterShop
} = require(path.resolve(__dirname, '../../database/services/shop.service'));

const Item = require(path.resolve(__dirname, '../../database/models/item.model'));
const Weapon = require(path.resolve(__dirname, '../../database/models/weapon.model'));
const Character = require(path.resolve(__dirname, '../../database/models/character.model'));
const Rarity = require(path.resolve(__dirname, '../../database/models/rarity.model'));
const Class = require(path.resolve(__dirname, '../../database/models/class.model'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Shopta satışta olan ürünleri listeler.'),

    async execute(interaction) {
        await refreshItemShop();
        await refreshWeaponShop();
        await refreshCharacterShop();

        const ShopItem = require(path.resolve(__dirname, '../../database/models/shopItem.model'));
        const ShopWeapon = require(path.resolve(__dirname, '../../database/models/shopWeapon.model'));
        const ShopCharacter = require(path.resolve(__dirname, '../../database/models/shopCharacter.model'));

        const itemShopData = await ShopItem.findOne();
        const weaponShopData = await ShopWeapon.findOne();
        const characterShopData = await ShopCharacter.findOne();

        function formatDate(date) {
            if (!date) return 'Bilinmiyor';
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const hour = String(d.getHours()).padStart(2, '0');
            const minute = String(d.getMinutes()).padStart(2, '0');
            return `${day}.${month}.${year} ${hour}:${minute}`;
        }

        const lastRefreshStrings = [
            `Item Shop: ${formatDate(itemShopData?.lastRefresh)}`,
            `Weapon Shop: ${formatDate(weaponShopData?.lastRefresh)}`,
            `Character Shop: ${formatDate(characterShopData?.lastRefresh)}`
        ].join('\n');

        const itemIndexes = await getCurrentItemShop();
        const weaponIndexes = await getCurrentWeaponShop();
        const characterIndexes = await getCurrentCharacterShop();

        const items = await Item.find({ itemIndex: { $in: itemIndexes } });
        const weapons = await Weapon.find({ weaponIndex: { $in: weaponIndexes } });
        const characters = await Character.find({ characterIndex: { $in: characterIndexes } });

        const rarities = await Rarity.find({});
        const rarityMap = new Map(rarities.map(r => [r.rarityId, r]));

        const classes = await Class.find({});
        const classMap = new Map(classes.map(c => [c.classId, c]));

        const embed = new EmbedBuilder()
            .setTitle('🛒 Shop')
            .setDescription('Satışta olan ürünler')
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter({ text: `Son yenileme tarihler:\n${lastRefreshStrings}` });

        if (items.length > 0) {
            const itemLines = items.map(i => {
                const rarity = rarityMap.get(i.rarityId);
                return `\`${i.itemIndex}\` ${i.itemIcon} **${i.itemName}** - \`${i.itemCost} coins\` - **${rarity?.rarityName || 'Unknown'}**`;
            }).join('\n');
            embed.addFields({ name: 'Items', value: itemLines, inline: false });
        } else {
            embed.addFields({ name: 'Items', value: 'Satışta item yok.', inline: false });
        }

        if (weapons.length > 0) {
            const weaponLines = weapons.map(w => {
                const rarity = rarityMap.get(w.rarityId);
                return `\`${w.weaponIndex}\` ${w.weaponIcon} **${w.weaponName}** - \`${w.weaponCost} coins\` - **${rarity?.rarityName || 'Unknown'}**`;
            }).join('\n');
            embed.addFields({ name: 'Weapons', value: weaponLines, inline: false });
        } else {
            embed.addFields({ name: 'Weapons', value: 'Satışta silah yok.', inline: false });
        }

        if (characters.length > 0) {
            const characterLines = characters.map(c => {
                const rarity = rarityMap.get(c.rarityId);
                const klass = classMap.get(c.classId);
                return `\`${c.characterIndex}\` ${c.characterIcon} **${c.characterName}** - \`${c.characterCost} coins\` - **${rarity?.rarityName || 'Unknown'}** - Class: **${klass?.className || 'Unknown'}**`;
            }).join('\n');
            embed.addFields({ name: 'Characters', value: characterLines, inline: false });
        } else {
            embed.addFields({ name: 'Characters', value: 'Satışta karakter yok.', inline: false });
        }

        await interaction.reply({ embeds: [embed] });
    }
};
