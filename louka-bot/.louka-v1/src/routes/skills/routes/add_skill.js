const express = require('express');
const router = express.Router();
const SkillModel = require('../../../database/models/skill.model');
const { generateUniqueSkillId } = require('../../../utils/idGenerator');

router.get('/', (req, res) => {
    res.render('skills/add_skill');
});

router.post('/', async (req, res) => {
    const { skillIndex, skillIcon, skillImage, skillName } = req.body;

    try {
        const newUniqueId = await generateUniqueSkillId();

        const newSkill = new SkillModel({
            skillId: parseInt(newUniqueId),
            skillIndex,
            skillIcon,
            skillImage,
            skillName
        });

        await newSkill.save();
        res.redirect('/skills');
    } catch (err) {
        console.error(err);
        res.status(500).send('Skill eklenirken bir hata oluştu');
    }
});

module.exports = router;