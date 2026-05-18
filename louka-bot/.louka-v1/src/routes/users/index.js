const express = require('express');
const router = express.Router();

const listUserRoutes = require('./routes/list_users');
const listUserItemsRoutes = require('./routes/list_user_items');
const addUserItemRoutes = require('./routes/add_user_item');
const listUserWeaponsRoutes = require('./routes/list_user_weapons');
const addUserWeaponRoutes = require('./routes/add_user_weapon');
const listUserCharactersRoutes = require('./routes/list_user_characters');
const addUserCharacterRoutes = require('./routes/add_user_character');

router.use('/', listUserRoutes);
router.use('/user_items', listUserItemsRoutes);
router.use('/add_user_item', addUserItemRoutes);
router.use('/user_weapons', listUserWeaponsRoutes);
router.use('/add_user_weapon', addUserWeaponRoutes);
router.use('/user_characters', listUserCharactersRoutes);
router.use('/add_user_character', addUserCharacterRoutes);

module.exports = router;
