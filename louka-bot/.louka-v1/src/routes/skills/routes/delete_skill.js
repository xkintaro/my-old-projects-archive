const express = require('express');
const router = express.Router();
const SkillModel = require('../../../database/models/skill.model');

router.delete('/:id', async (req, res) => {
    try {
        const skillId = req.params.id;
        await SkillModel.findOneAndDelete({ skillId: Number(skillId) });

        res.send({
            success: true,
            message: 'Skill deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting skill',
            error: err.message
        });
    }
});

module.exports = router;
