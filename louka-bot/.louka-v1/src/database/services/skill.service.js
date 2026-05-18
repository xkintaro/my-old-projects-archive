const Skill = require('../models/skill.model');

async function getSkillList() {
    return await Skill.find({});
}

module.exports = { getSkillList };