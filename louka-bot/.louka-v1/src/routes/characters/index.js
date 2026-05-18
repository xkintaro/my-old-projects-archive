const express = require('express');
const router = express.Router();

const addCharacterRoutes = require('./routes/add_character');
const listCharacterRoutes = require('./routes/list_characters');
const updateCharacterRoutes = require('./routes/update_character');
const deleteCharacterRoutes = require('./routes/delete_character');

router.use('/add_character', addCharacterRoutes);
router.use('/update_character', updateCharacterRoutes);
router.use('/delete_character', deleteCharacterRoutes);
router.use('/', listCharacterRoutes);

module.exports = router;