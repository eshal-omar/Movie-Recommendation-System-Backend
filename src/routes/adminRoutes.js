const express = require('express');
const {
    
    moderateReview,
    getSiteStatistics,
} = require('../controllers/adminController');
const  authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();




router.delete('/reviews/:reviewId', authMiddleware(['admin']), moderateReview);
router.get('/statistics', authMiddleware(['admin']),  getSiteStatistics);

module.exports = router;
