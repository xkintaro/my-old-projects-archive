const express = require('express');
const router = express.Router();
const ItemModel = require('../../../database/models/item.model');
const UserItem = require('../../../database/models/userItem.model');

router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;

        await UserItem.deleteMany({ itemId: Number(itemId) });

        await ItemModel.findOneAndDelete({ itemId: Number(itemId) });

        res.send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Item silinirken bir hata oluştu.',
            error: err.message
        });
    }
});

module.exports = router;