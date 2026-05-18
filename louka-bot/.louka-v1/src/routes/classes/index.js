const express = require('express');
const router = express.Router();

const addClassRoutes = require('./routes/add_class');
const listClassRoutes = require('./routes/list_classes');
const updateClassRoutes = require('./routes/update_class');
const deleteClassRoutes = require('./routes/delete_class');

router.use('/add_class', addClassRoutes);
router.use('/update_class', updateClassRoutes);
router.use('/delete_class', deleteClassRoutes);
router.use('/', listClassRoutes);

module.exports = router;