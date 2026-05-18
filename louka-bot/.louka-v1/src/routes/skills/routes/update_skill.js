const express = require('express');
const router = express.Router();
const SkillModel = require('../../../database/models/skill.model');

router.get('/:id', async (req, res) => {
    try {
        const skillId = req.params.id;
        const skill = await SkillModel.findOne({ skillId: Number(skillId) });

        if (!skill) {
            return res.status(404).send('Skill not found');
        }

        res.render('skills/update_skill', {
            skill
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const skillId = req.params.id;
    const { skillIndex, skillIcon, skillImage, skillName } = req.body;

    try {
        await SkillModel.findOneAndUpdate(
            { skillId: Number(skillId) },
            {
                skillIndex,
                skillIcon,
                skillImage,
                skillName
            },
            { new: true }
        );

        res.redirect('/skills');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating skill');
    }
});

module.exports = router;