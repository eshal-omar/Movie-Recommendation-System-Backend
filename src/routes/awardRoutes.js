const express = require('express');
const router = express.Router();
const { addAwards, getAwards } = require('../controllers/awardController');

//route to add awards data
router.post('/add', addAwards);

//route to get awards by movie ID
router.get('/:movieId', getAwards);

module.exports = router;
