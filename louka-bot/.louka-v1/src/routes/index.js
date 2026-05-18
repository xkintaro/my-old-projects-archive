const express = require('express');
const router = express.Router();

const itemRoutes = require('./items');
const weaponRoutes = require('./weapons');
const characterRoutes = require('./characters');
const classRoutes = require('./classes');
const skillRoutes = require('./skills');
const rarityRoutes = require('./rarities');
const userRoutes = require('./users');

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/home', async (req, res) => {
    res.render('home');
});

router.use('/items', itemRoutes);
router.use('/weapons', weaponRoutes);
router.use('/characters', characterRoutes);
router.use('/classes', classRoutes);
router.use('/skills', skillRoutes);
router.use('/rarities', rarityRoutes);
router.use('/users', userRoutes);

module.exports = router;
