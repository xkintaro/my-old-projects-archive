const express = require('express');
const router = express.Router();

const addRarityRoutes = require('./routes/add_rarity');
const listRarityRoutes = require('./routes/list_rarities');
const updateRarityRoutes = require('./routes/update_rarity');
const deleteRarityRoutes = require('./routes/delete_rarity');

router.use('/add_rarity', addRarityRoutes);
router.use('/update_rarity', updateRarityRoutes);
router.use('/delete_rarity', deleteRarityRoutes);
router.use('/', listRarityRoutes);

module.exports = router;