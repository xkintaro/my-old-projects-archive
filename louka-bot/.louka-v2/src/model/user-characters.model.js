const mongoose = require('mongoose');

const userCharacterSchema = new mongoose.Schema({
    userCharacterId: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    characterId: {
        type: Number,
        required: true
    },
    saleStatus: {
        type: Boolean,
        default: false
    },
    characterLevel: {
        type: Number,
        default: 0
    },
    characterXp: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

userCharacterSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('userId')) {
        let uniqueIdFound = false;
        while (!uniqueIdFound) {
            const paddedCharacterId = this.characterId.toString().padStart(3, '0');
            const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const newId = `${paddedCharacterId}${randomSuffix}`;

            const exists = await mongoose.models.UserCharacter.findOne({
                userId: this.userId,
                userCharacterId: newId
            });

            if (!exists) {
                this.userCharacterId = newId;
                uniqueIdFound = true;
            }
        }
    }
    next();
});

userCharacterSchema.index({ userId: 1, userCharacterId: 1 }, { unique: true });

const UserCharacter = mongoose.model('UserCharacter', userCharacterSchema);
module.exports = UserCharacter;