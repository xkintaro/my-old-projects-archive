const express = require('express');
const router = express.Router();

const { getUserItems } = require('../../../database/services/item.service');

router.get('/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).send('Geçersiz kullanıcı ID.');
    }

    const items = await getUserItems(userId);
    res.render('users/list_user_items', { userId, items });
});


module.exports = router;