const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const User = require(path.resolve(__dirname, '../../database/models/user.model'));
const UserItem = require(path.resolve(__dirname, '../../database/models/userItem.model'));
const UserWeapon = require(path.resolve(__dirname, '../../database/models/userWeapon.model'));
const UserCharacter = require(path.resolve(__dirname, '../../database/models/userCharacter.model'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Kullanıcı profilini görsel olarak gösterir.'),

    async execute(interaction) {
        function roundRect(ctx, x, y, width, height, radius) {
            if (typeof radius === 'number') {
                radius = { tl: radius, tr: radius, br: radius, bl: radius };
            } else {
                radius = { ...{ tl: 0, tr: 0, br: 0, bl: 0 }, ...radius };
            }
            ctx.beginPath();
            ctx.moveTo(x + radius.tl, y);
            ctx.lineTo(x + width - radius.tr, y);
            ctx.arc(x + width - radius.tr, y + radius.tr, radius.tr, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(x + width, y + height - radius.br);
            ctx.arc(x + width - radius.br, y + height - radius.br, radius.br, 0, Math.PI * 0.5);
            ctx.lineTo(x + radius.bl, y + height);
            ctx.arc(x + radius.bl, y + height - radius.bl, radius.bl, Math.PI * 0.5, Math.PI);
            ctx.lineTo(x, y + radius.tl);
            ctx.arc(x + radius.tl, y + radius.tl, radius.tl, Math.PI, Math.PI * 1.5);
            ctx.closePath();
            return ctx;
        }

        const userId = interaction.user.id;
        const member = interaction.member;

        const user = await User.findOne({ userId });
        if (!user) {
            return interaction.reply({ content: 'Kayıtlı kullanıcı bulunamadı. Lütfen /register ile kayıt ol.', ephemeral: true });
        }

        const itemCount = await UserItem.countDocuments({ userId });
        const weaponCount = await UserWeapon.countDocuments({ userId });
        const characterCount = await UserCharacter.countDocuments({ userId });

        const width = 800;
        const height = 300;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(
                Math.random() * width,
                Math.random() * height,
                Math.random() * 50 + 10,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }

        const avatarSize = 150;
        const avatarX = 40;
        const avatarY = height / 2 - avatarSize / 2;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 10, 0, Math.PI * 2);
        ctx.fill();

        try {
            const avatarURL = interaction.user.displayAvatarURL({ extension: 'png', size: 256 });
            const avatar = await loadImage(avatarURL);

            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
            ctx.restore();

            ctx.strokeStyle = '#4cc9f0';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
            ctx.stroke();
        } catch (err) {
            console.error('Avatar yüklenemedi:', err);
        }

        const infoX = avatarX + avatarSize + 30;
        const infoY = 90;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(interaction.user.username, infoX, infoY);

        ctx.fillStyle = '#a1a1aa';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Kayıt Tarihi: ${user.createdAt.toLocaleDateString('tr-TR')}`, infoX, infoY + 50);

        const statsY = infoY + 90;
        const statWidth = 150;

        ctx.fillStyle = 'rgba(79, 70, 229, 0.2)';
        roundRect(ctx, infoX, statsY, statWidth, 50, 10).fill();
        roundRect(ctx, infoX + statWidth + 15, statsY, statWidth, 50, 10).fill();
        roundRect(ctx, infoX + (statWidth + 15) * 2, statsY, statWidth, 50, 10).fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(itemCount.toString(), infoX + statWidth / 2, statsY + 30);
        ctx.fillText(weaponCount.toString(), infoX + statWidth + 15 + statWidth / 2, statsY + 30);
        ctx.fillText(characterCount.toString(), infoX + (statWidth + 15) * 2 + statWidth / 2, statsY + 30);

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText('Eşya', infoX + statWidth / 2, statsY + 45);
        ctx.fillText('Silah', infoX + statWidth + 15 + statWidth / 2, statsY + 45);
        ctx.fillText('Karakter', infoX + (statWidth + 15) * 2 + statWidth / 2, statsY + 45);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, height - 30);
        ctx.lineTo(width - 30, height - 30);
        ctx.stroke();

        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`ID: ${userId}`, width - 30, height - 10);

        const buffer = canvas.toBuffer('image/png');

        await interaction.reply({
            files: [{
                attachment: buffer,
                name: 'profile.png'
            }]
        });
    }
};