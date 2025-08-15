const express = require('express');
const { addOrUpdateReview, getMovieReviews, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(), addOrUpdateReview);
router.get('/:movieId', getMovieReviews);
router.delete('/:reviewId', authMiddleware(), deleteReview);

module.exports = router;
