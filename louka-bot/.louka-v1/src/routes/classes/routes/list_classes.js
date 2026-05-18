const express = require('express');
const router = express.Router();
const ClassModel = require('../../../database/models/class.model');

router.get('/', async (req, res) => {
    try {
        const classes = await ClassModel.find().sort({ classIndex: -1 });
        res.render('classes/list_classes', { classes });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error listing classes');
    }
});

module.exports = router;