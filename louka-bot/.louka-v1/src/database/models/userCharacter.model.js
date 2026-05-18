const mongoose = require('mongoose');

const UserCharacterSchema = new mongoose.Schema({
    userCharacterId: {
        type: Number,
        required: true,
        unique: true
    },

    userCharacterDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Number,
        required: true
    },
    characterId: {
        type: Number,
        required: true
    },

    characterLevel: { type: Number, default: 0 },
    characterXp: { type: Number, default: 0 },
    characterStatPoint: { type: Number, default: 0 },
    characterUsedStatPoint: { type: Number, default: 0 },

    userCharacterStats: {
        resolution: { type: Number, default: 0 },                                    // azim
        patience: { type: Number, default: 0 },                                      // sabır
        hp: { type: Number, default: 0 },                                            // can
        armor: { type: Number, default: 0 },                                         // zırh
        magicResistance: { type: Number, default: 0 },                               // büyü direnci
        damageReduction: { type: Number, default: 0 },                               // hasar azaltma
        absoluteDefense: { type: Number, default: 0 },                               // mutlak savunma
        attackPower: { type: Number, default: 0 },                                   // saldırı gücü
        magicPower: { type: Number, default: 0 },                                    // büyü gücü
        armorPiercing: { type: Number, default: 0 },                                 // zırh delme
        armorPenetration: { type: Number, default: 0 },                              // zırh deşme
        magicalInfluence: { type: Number, default: 0 },                              // büyü nüfuzu
        speed: { type: Number, default: 0 },                                         // hız
        criticalProbability: { type: Number, default: 0 },                           // kritik şansı
        criticalDamage: { type: Number, default: 0 },                                // kritik hasarı
        avoidance: { type: Number, default: 0 },                                     // kaçınma
        luck: { type: Number, default: 0 },                                          // şans
        mana: { type: Number, default: 0 },                                          // mana
        energy: { type: Number, default: 0 },                                        // enerji
        fatigue: { type: Number, default: 0 }                                        // yorgunluk
    }

});

const UserCharacter = mongoose.model('usercharacters', UserCharacterSchema);

module.exports = UserCharacter;
