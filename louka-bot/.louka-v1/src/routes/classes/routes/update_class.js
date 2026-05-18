const express = require('express');
const router = express.Router();
const ClassModel = require('../../../database/models/class.model');

router.get('/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const cls = await ClassModel.findOne({ classId: Number(classId) });

        if (!cls) {
            return res.status(404).send('Class not found');
        }

        res.render('classes/update_class', {
            cls
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading edit form');
    }
});

router.post('/:id', async (req, res) => {
    const classId = req.params.id;
    const { classIndex, className, classDescription, classColor } = req.body;

    try {
        await ClassModel.findOneAndUpdate(
            { classId: Number(classId) },
            {
                classIndex,
                className,
                classDescription,
                classColor
            },
            { new: true }
        );

        res.redirect('/classes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating class');
    }
});

module.exports = router;