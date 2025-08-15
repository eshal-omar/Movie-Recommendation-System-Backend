const express = require('express');
const router = express.Router();
const { addNews, getNews, getNewsByCategory } = require('../controllers/newsController');

//route to add a news article
router.post('/add', addNews);

//route to get all news articles
router.get('/all', getNews);

//route to get news by category (e.g., Movies, Actors, Industry)
router.get('/category/:category', getNewsByCategory);

module.exports = router;
