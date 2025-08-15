const express = require('express');
const router = express.Router();
const { addBoxOffice, getBoxOffice } = require('../controllers/boxOfficeController');

// Route to add box office details
router.post('/add', addBoxOffice);

// Route to get box office details by movie ID
router.get('/:movieId', getBoxOffice);

module.exports = router;
