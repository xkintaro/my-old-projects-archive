const express = require('express');
const router = express.Router();

const addItemRoutes = require('./routes/add_item');
const listItemRoutes = require('./routes/list_items');
const updateItemRoutes = require('./routes/update_item');
const deleteItemRoutes = require('./routes/delete_item');

router.use('/add_item', addItemRoutes);
router.use('/update_item', updateItemRoutes);
router.use('/delete_item', deleteItemRoutes);
router.use('/', listItemRoutes);

module.exports = router;