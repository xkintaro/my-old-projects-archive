const express = require('express');
const router = express.Router();
const UserModel = require('../../../database/models/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });
        res.render('users/list_users', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Kullanıcılar listelenirken bir hata oluştu.');
    }
});

module.exports = router;
