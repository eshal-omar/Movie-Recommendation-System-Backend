const express = require('express');
const router = express.Router();
const { addBoxOffice, getBoxOffice } = require('../controllers/boxOfficeController');

//route to add box office details
router.post('/add', addBoxOffice);

//route to get box office details by movie ID
router.get('/:movieId', getBoxOffice);

module.exports = router;
