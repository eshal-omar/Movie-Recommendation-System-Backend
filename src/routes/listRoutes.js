const express = require('express');
const { createCustomList, followCustomList, addMovieToCustomList, getAllLists } = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(), createCustomList); //create list
router.post('/follow/:listId', authMiddleware(), followCustomList); //follow list
router.post('/add-movie/:listId/:movieId', authMiddleware(), addMovieToCustomList); //add movie to list
router.get('/',authMiddleware(),getAllLists);   
module.exports = router;
