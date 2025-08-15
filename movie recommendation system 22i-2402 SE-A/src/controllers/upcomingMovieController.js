const UpcomingMovie = require('../models/UpcomingMovie');

// Add an upcoming movie
const addUpcomingMovie = async (req, res) => {
    try {
        const { title, releaseDate, genre, trailerUrl } = req.body;

        if (!title || !releaseDate || !genre) {
            return res.status(400).json({ message: 'Title, release date, and genre are required' });
        }

        const movie = await UpcomingMovie.create({
            title,
            releaseDate,
            genre,
            trailerUrl,
        });

        res.status(201).json({ message: 'Upcoming movie added', movie });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Get upcoming movies
const getUpcomingMovies = async (req, res) => {
    try {
        const upcomingMovies = await UpcomingMovie.find().populate('reminders', 'name email');
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Set a reminder for an upcoming movie

//const User = require('../models/User');

// Add Reminder for a Movie
const setReminder = async (req, res) => {
    try {
        const { movieId } = req.params; // Assuming movie ID is passed in the URL
        const userId = req.user.id; // Extracted from auth middleware

        // Find the movie
        const movie = await UpcomingMovie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if the user has already set a reminder for this movie
        if (movie.reminders.includes(userId)) {
            return res.status(400).json({ message: 'Reminder already set for this movie' });
        }

        // Add user to reminders
        movie.reminders.push(userId);
        await movie.save();

        res.status(200).json({ message: 'Reminder added successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





module.exports = { addUpcomingMovie,getUpcomingMovies,setReminder };
