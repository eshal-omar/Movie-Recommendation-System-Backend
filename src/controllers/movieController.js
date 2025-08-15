const Movie = require('../models/Movie');
const mongoose = require('mongoose');

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
        const filter = {};

        
        if (title) filter.title = { $regex: title, $options: 'i' };

        
        if (genre) filter.genre = { $in: genre.split(',') };

        
        if (director) filter.directorProfiles = { $elemMatch: { name: { $regex: director, $options: 'i' } } };

        
        if (actor) filter.actorProfiles = { $elemMatch: { name: { $regex: actor, $options: 'i' } } };

        
        if (crewMember) filter.crewProfiles = { $elemMatch: { name: { $regex: crewMember, $options: 'i' } } };

       
        if (minRating) filter.averageRating = { ...filter.averageRating, $gte: Number(minRating) };
        if (maxRating) filter.averageRating = { ...filter.averageRating, $lte: Number(maxRating) };

       
        if (releaseYear) {
            filter.releaseDate = {
                $gte: new Date(`${releaseYear}-01-01`),
                $lte: new Date(`${releaseYear}-12-31`),
            };
        }

        
        if (ageRating) filter.ageRating = ageRating;

        
        if (parentalGuidance) {
            filter.parentalGuidance = { $regex: parentalGuidance, $options: 'i' };
        }

        
        if (keywords) {
            filter.$or = [
                { trivia: { $in: keywords.split(',') } },
                { goofs: { $in: keywords.split(',') } },
                { soundtrack: { $in: keywords.split(',') } },
            ];
        }

       
        const movies = await Movie.find(filter).sort({ averageRating: -1 }); 

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { addMovie, updateMovie, deleteMovie ,getMovies,searchMovies};