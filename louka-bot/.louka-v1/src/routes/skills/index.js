const express = require('express');
const router = express.Router();

const addSkillRoutes = require('./routes/add_skill');
const listSkillRoutes = require('./routes/list_skills');
const updateSkillRoutes = require('./routes/update_skill');
const deleteSkillRoutes = require('./routes/delete_skill');

router.use('/add_skill', addSkillRoutes);
router.use('/update_skill', updateSkillRoutes);
router.use('/delete_skill', deleteSkillRoutes);
router.use('/', listSkillRoutes);

module.exports = router;