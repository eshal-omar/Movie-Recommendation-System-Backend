const express = require('express');
const {
    
    moderateReview,
    getSiteStatistics,
} = require('../controllers/adminController');
const  authMiddleware = require('../middlewares/authMiddleware'); // Assume admin middleware is implemented

const router = express.Router();



// Admin Review Moderation
router.delete('/reviews/:reviewId', authMiddleware(['admin']), moderateReview);

// Admin Site Statistics
router.get('/statistics', authMiddleware(['admin']),  getSiteStatistics);

module.exports = router;
