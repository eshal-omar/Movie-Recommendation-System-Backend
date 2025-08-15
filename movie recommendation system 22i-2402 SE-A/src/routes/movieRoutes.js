const express = require('express');
const { getMovies, addMovie,updateMovie,deleteMovie, searchMovies } = require('../controllers/movieController');
const { addUpcomingMovie,getUpcomingMovies,setReminder } = require('../controllers/upcomingMovieController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(), getMovies);
//router.post('/', authMiddleware(['admin']), addMovie);
router.post('/', authMiddleware(['admin']), addMovie);
router.patch('/:id', authMiddleware(['admin']), updateMovie);
router.delete('/:id', authMiddleware(['admin']), deleteMovie);
router.get('/search',authMiddleware(),searchMovies);
router.get('/upcoming', authMiddleware(), getUpcomingMovies);
router.post('/upcoming', authMiddleware(['admin']), addUpcomingMovie);
router.post('/:movieId/reminders', authMiddleware(), setReminder);
module.exports = router;


//const express = require('express');

//const authMiddleware = require('../middlewares/authMiddleware');
//const router = express.Router();


