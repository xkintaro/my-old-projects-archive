const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    characterId: { type: Number, required: true, unique: true },
    characterIndex: { type: Number, required: true, unique: true },

    characterName: { type: String, required: true },
    characterIcon: { type: String, required: true },
    characterImage: { type: String, required: true },
    characterDescription: { type: String, required: true },
    characterDate: { type: Date, default: Date.now },
    characterCost: { type: Number, required: true },

    characterStats: {
        resolution: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // azim
        patience: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // sabır
        hp: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // can
        armor: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // zırh
        magicResistance: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // büyü direnci
        damageReduction: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // hasar azaltma
        absoluteDefense: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // mutlak savunma
        attackPower: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // saldırı gücü
        magicPower: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // büyü gücü
        armorPiercing: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // zırh delme
        armorPenetration: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // zırh deşme
        magicalInfluence: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // büyü nüfuzu
        speed: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // hız
        criticalProbability: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // kritik şansı
        criticalDamage: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // kritik hasarı
        avoidance: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // kaçınma
        luck: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // şans
        mana: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // mana
        energy: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // enerji
        fatigue: {
            value: { type: Number, required: true },
            icon: { type: String },
            description: { type: String }
        }, // yorgunluk
    },

    rarityId: { type: Number, required: true },
    classId: { type: Number, required: true },
});

const Character = mongoose.model('characters', characterSchema);

module.exports = Character;
