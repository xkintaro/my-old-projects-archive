const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 14
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    image: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: "",
        maxlength: 120,
    },
    accountStatus: {
        type: Boolean,
        default: true,
    },
    connectionStatus: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (!this.image) {
        const randomAvatar = Math.floor(Math.random() * 4) + 1;
        this.image = `default/default_profile_${randomAvatar}.jpg`;
    }
    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
