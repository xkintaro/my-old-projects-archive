const mongoose = require('mongoose');

const UserItem = mongoose.model('useritems', new mongoose.Schema({
    userItemCount: {
        type: Number,
        default: 1
    },
    userItemDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Number,
        required: true
    },
    itemId: {
        type: Number,
        required: true
    },
}));

module.exports = UserItem;
