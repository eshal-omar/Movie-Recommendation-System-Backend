const express = require('express');
const router = express.Router();
const { addAwards, getAwards } = require('../controllers/awardController');

// Route to add awards data
router.post('/add', addAwards);

// Route to get awards by movie ID
router.get('/:movieId', getAwards);

module.exports = router;
