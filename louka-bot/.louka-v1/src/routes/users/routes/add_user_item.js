const express = require('express');
const router = express.Router();

const UserItem = require('../../../database/models/userItem.model');
const { getItemList } = require('../../../database/services/item.service');

router.get('/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const items = await getItemList();
        res.render('users/add_user_item', { userId, items, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Form yüklenirken bir hata oluştu.');
    }
});

router.post('/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const itemId = Number(req.body.itemId);
        const count = Number(req.body.count) || 1;

        if (isNaN(userId) || isNaN(itemId)) {
            return res.status(400).send('Geçersiz kullanıcı veya item ID.');
        }

        const existing = await UserItem.findOne({ userId, itemId });
        if (existing) {
            existing.userItemCount += count;
            await existing.save();
        } else {
            const newUserItem = new UserItem({
                userId,
                itemId,
                userItemCount: count
            });

            await newUserItem.save();
        }

        res.redirect(`/users/user_items/${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Item eklenirken bir hata oluştu.');
    }
});

module.exports = router;