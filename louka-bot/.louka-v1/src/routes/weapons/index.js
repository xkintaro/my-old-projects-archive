const express = require('express');
const router = express.Router();

const addWeaponRoutes = require('./routes/add_weapon');
const listWeaponRoutes = require('./routes/list_weapons');
const updateWeaponRoutes = require('./routes/update_weapon');
const deleteWeaponRoutes = require('./routes/delete_weapon');

router.use('/add_weapon', addWeaponRoutes);
router.use('/update_weapon', updateWeaponRoutes);
router.use('/delete_weapon', deleteWeaponRoutes);
router.use('/', listWeaponRoutes);

module.exports = router;