const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillId: { type: Number, required: true, unique: true },
    skillIndex: { type: Number, required: true, unique: true },
    skillName: { type: String, required: true },
    skillIcon: { type: String, required: true },
    skillImage: { type: String, required: true },
});

const Skills = mongoose.model('skills', skillSchema);

module.exports = Skills;