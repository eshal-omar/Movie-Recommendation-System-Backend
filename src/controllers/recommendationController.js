const Movie = require('../models/Movie');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;

        //get user preferences
        const user = await User.findById(userId);
        const { preferences } = user;

        
        const recommendedMovies = await Movie.find({
            $or: [
                { genre: { $in: preferences } },
                { director: { $in: preferences } },
            ],
        }).sort({ averageRating: -1 }); 

        res.json({ message: "Personalized recommendations", movies: recommendedMovies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getSimilarTitles = async (req, res) => {
    const { movieId } = req.params;

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const similarMovies = await Movie.find({
            $or: [
                { genre: { $in: movie.genre } },
                { director: movie.director },
            ],
            _id: { $ne: movie._id }, 
        }).sort({ averageRating: -1 });

        res.json({ message: "Similar titles", movies: similarMovies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const Review = require('../models/Review');
//const Movie = require('../models/Movie');

exports.getTrendingMovies = async (req, res) => {
    try {
        
        const trendingMovies = await Review.aggregate([
            {
                $group: {
                    _id: "$movie", 
                    reviewCount: { $sum: 1 }, //count the number of reviews for each movie
                },
            },
            {
                $sort: { reviewCount: -1 }, 
            },
            {
                $limit: 10, 
            },
        ]);

        
        const movies = await Movie.find({
            _id: { $in: trendingMovies.map((m) => m._id) },
        }).select("title genre director averageRating");

        
        const result = movies.map((movie) => {
            const trendingInfo = trendingMovies.find((t) => t._id.equals(movie._id));
            return {
                ...movie._doc,
                reviewCount: trendingInfo ? trendingInfo.reviewCount : 0,
            };
        });

        res.json({ message: "Trending Movies", movies: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};



exports.getTopRatedMovies = async (req, res) => {
    try {
        const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(10);
        res.json({ message: "Top-rated movies", movies: topRatedMovies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
