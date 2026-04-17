const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Server',
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Tag'

    }],
    keywords: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    showpreview: {
        type: Boolean, required: true, default: true
    },
    thumbnail: String,
    mimetype: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('File', fileSchema);