const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    classId: { type: Number, required: true, unique: true },
    classIndex: { type: Number, required: true, unique: true },
    className: { type: String, required: true },
    classDescription: { type: String, required: true },
    classDate: { type: Date, default: Date.now },
    classColor: { type: String, required: true }
});

const Class = mongoose.model('classes', classSchema);

module.exports = Class;