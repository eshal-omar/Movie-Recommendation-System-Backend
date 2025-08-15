const Movie = require('../models/Movie');
const mongoose = require('mongoose');
// Get movies with pagination
const getMovies = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const movies = await Movie.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//const Movie = require('../models/Movie');

// Add a new movie
const addMovie = async (req, res) => {
    try {
        const {
            title,
            genre,
            director,
            cast,
            releaseDate,
            runtime,
            synopsis,
            averageRating,
            movieCoverPhoto,
            trivia,
            goofs,
            soundtrack,
            actorProfiles,
            directorProfiles,
            crewProfiles,
            ageRating,
            parentalGuidance
        } = req.body;

        const movie = new Movie({
            title,
            genre,
            director,
            cast,
            releaseDate,
            runtime,
            synopsis,
            averageRating,
            movieCoverPhoto,
            trivia,
            goofs,
            soundtrack,
            actorProfiles,
            directorProfiles,
            crewProfiles,
            ageRating,
            parentalGuidance
        });

        await movie.save();
        res.status(201).json({ message: 'Movie added successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Update an existing movie
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = req.body;

        const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ message: 'Movie updated successfully', movie });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Delete a movie
const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.id;

        const movie = await Movie.findByIdAndDelete(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


//const Movie = require('../models/Movie');

// Search and filter movies
const searchMovies = async (req, res) => {
    const {
        title,
        genre,
        director,
        actor,
        crewMember,
        minRating,
        maxRating,
        releaseYear,
        ageRating,
        language,
        country,
        keywords,
        parentalGuidance
    } = req.query;

    try {
        // Build the search filter object
        const filter = {};

        // Title search
        if (title) filter.title = { $regex: title, $options: 'i' };

        // Genre search
        if (genre) filter.genre = { $in: genre.split(',') };

        // Director search
        if (director) filter.directorProfiles = { $elemMatch: { name: { $regex: director, $options: 'i' } } };

        // Actor search
        if (actor) filter.actorProfiles = { $elemMatch: { name: { $regex: actor, $options: 'i' } } };

        // Crew member search
        if (crewMember) filter.crewProfiles = { $elemMatch: { name: { $regex: crewMember, $options: 'i' } } };

        // Ratings filter
        if (minRating) filter.averageRating = { ...filter.averageRating, $gte: Number(minRating) };
        if (maxRating) filter.averageRating = { ...filter.averageRating, $lte: Number(maxRating) };

        // Release year filter
        if (releaseYear) {
            filter.releaseDate = {
                $gte: new Date(`${releaseYear}-01-01`),
                $lte: new Date(`${releaseYear}-12-31`),
            };
        }

        // Age rating filter
        if (ageRating) filter.ageRating = ageRating;

        // Parental guidance filter
        if (parentalGuidance) {
            filter.parentalGuidance = { $regex: parentalGuidance, $options: 'i' };
        }

        // Keywords search
        if (keywords) {
            filter.$or = [
                { trivia: { $in: keywords.split(',') } },
                { goofs: { $in: keywords.split(',') } },
                { soundtrack: { $in: keywords.split(',') } },
            ];
        }

        // Fetch movies with filters
        const movies = await Movie.find(filter).sort({ averageRating: -1 }); // Sort by rating in descending order

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { addMovie, updateMovie, deleteMovie ,getMovies,searchMovies};