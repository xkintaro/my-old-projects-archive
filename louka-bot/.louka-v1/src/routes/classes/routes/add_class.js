const express = require('express');
const router = express.Router();
const ClassModel = require('../../../database/models/class.model');
const { generateUniqueClassId } = require('../../../utils/idGenerator');

router.get('/', (req, res) => {
    res.render('classes/add_class');
});

router.post('/', async (req, res) => {
    const { classIndex, className, classDescription, classColor } = req.body;

    try {
        const newUniqueId = await generateUniqueClassId();

        const newClass = new ClassModel({
            classId: parseInt(newUniqueId),
            classIndex,
            className,
            classDescription,
            classColor
        });

        await newClass.save();
        res.redirect('/classes');
    } catch (err) {
        console.error(err);
        res.status(500).send('Sınıf eklenirken bir hata oluştu');
    }
});

module.exports = router;
