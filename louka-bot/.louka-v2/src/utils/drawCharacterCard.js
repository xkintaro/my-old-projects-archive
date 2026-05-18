const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function drawCharacterCard(character, total, index) {
    const width = 900;
    const height = 450;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    try {
        const bg = await loadImage(path.join(__dirname, '../assets/char_bg.png'));
        ctx.drawImage(bg, 0, 0, width, height);
    } catch {
        ctx.fillStyle = '#0f1923';
        ctx.fillRect(0, 0, width, height);
    }

    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(30, 30, width - 60, height - 60);
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.font = 'bold 34px "Arial"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`[${character.userCharacterId}] ${character.details.name}`, 60, 80);

    if (character.details.image) {
        try {
            const avatar = await loadImage(character.details.image);
            ctx.drawImage(avatar, 60, 110, 260, 260);
        } catch {
            ctx.strokeStyle = '#555';
            ctx.strokeRect(60, 110, 260, 260);
        }
    }

    const textStartX = 360;
    const textStartY = 140;
    const lineHeight = 38;

    ctx.font = 'bold 26px "Arial"';
    ctx.fillStyle = '#f1c40f';
    ctx.fillText('Temel Bilgiler', textStartX, textStartY);

    ctx.font = '24px "Arial"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`HP: ${character.details.can} / ${character.details.max_can}`, textStartX, textStartY + lineHeight * 1);
    ctx.fillText(`Saldırı Gücü: ${character.details.saldiri_gucu}`, textStartX, textStartY + lineHeight * 2);
    ctx.fillText(`Hasar Bonusu: x${character.details.hasar_bonusu}`, textStartX, textStartY + lineHeight * 3);

    ctx.fillStyle = '#f1c40f';
    ctx.fillText('Kritik & Zırh', textStartX, textStartY + lineHeight * 5);

    ctx.font = '24px "Arial"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Kritik Oranı: %${character.details.kritik_ihtimali}`, textStartX, textStartY + lineHeight * 6);
    ctx.fillText(`Kritik Hasarı: x${character.details.kritik_hasari}`, textStartX, textStartY + lineHeight * 7);
    ctx.fillText(`Zırh: ${character.details.zirh}`, textStartX, textStartY + lineHeight * 8);
    ctx.fillText(`Zırh Delme: ${character.details.zirh_delme} (%${(character.details.zirh_delme_p * 100).toFixed(0)})`, textStartX, textStartY + lineHeight * 9);

    ctx.fillStyle = '#aaaaaa';
    ctx.font = '20px "Arial"';
    const text = `Sayfa ${index} / ${total} | Karakter ID: ${character.characterId}`;
    ctx.fillText(text, width - ctx.measureText(text).width - 60, height - 40);

    return canvas.toBuffer('image/png');
}

module.exports = { drawCharacterCard };
