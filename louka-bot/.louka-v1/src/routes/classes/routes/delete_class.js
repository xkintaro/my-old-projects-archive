const express = require('express');
const router = express.Router();
const ClassModel = require('../../../database/models/class.model');

router.delete('/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        await ClassModel.findOneAndDelete({ classId: Number(classId) });

        res.send({
            success: true,
            message: 'Class deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting class',
            error: err.message
        });
    }
});

module.exports = router;