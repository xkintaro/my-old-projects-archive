const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
    },
    characterId: {
        type: Number,
        required: true
    },
    userCharacterId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

marketSchema.pre('validate', async function (next) {
    if (this.isNew && !this.productId) {
        let uniqueIdFound = false;

        while (!uniqueIdFound) {

            const randomSuffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');

            const exists = await mongoose.models.Market.findOne({
                productId: randomSuffix
            });

            if (!exists) {
                this.productId = randomSuffix;
                uniqueIdFound = true;
            }
        }
    }
    next();
});

const Market = mongoose.model('Market', marketSchema);
module.exports = Market;