const express = require('express');
const router = express.Router();
const SkillModel = require('../../../database/models/skill.model');

router.get('/', async (req, res) => {
    try {
        const skills = await SkillModel.find().sort({ skillIndex: -1 });
        res.render('skills/list_skills', { skills });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing skills');
    }
});

module.exports = router;