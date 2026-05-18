const express = require('express');
const router = express.Router();
const RarityModel = require('../../../database/models/rarity.model');

router.delete('/:id', async (req, res) => {
    try {
        const rarityId = req.params.id;
        await RarityModel.findOneAndDelete({ rarityId: Number(rarityId) });

        res.send({
            success: true,
            message: 'Rarity deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error deleting rarity',
            error: err.message
        });
    }
});

module.exports = router;