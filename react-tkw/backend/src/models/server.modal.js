const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 14
    },
    description: {
        type: String,
        default: "",
        maxlength: 100,
    },
    image: {
        type: String,
        default: ""
    },
    public: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

serverSchema.pre('save', function (next) {
    if (!this.image) {
        const randomImage = Math.floor(Math.random() * 4) + 1;
        this.image = `default/default_image_${randomImage}.jpg`;
    }
    next();
});

module.exports = mongoose.model('Server', serverSchema);
