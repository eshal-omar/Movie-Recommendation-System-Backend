const express = require('express');
const { getUserProfile, updateUserProfile, addToWishlist } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware(), getUserProfile);
router.put('/profile', authMiddleware(), updateUserProfile);
router.post('/wishlist', authMiddleware(), addToWishlist);

module.exports = router;
