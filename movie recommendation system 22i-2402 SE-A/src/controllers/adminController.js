const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');


exports.moderateReview = async (req, res) => {
    const { reviewId } = req.params; // Review ID from URL

    try {
        // Delete the review using the reviewId from the URL
        const review = await Review.findByIdAndDelete(reviewId);

        // If no review is found, return a 404 error
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Admin: View Site Statistics
exports.getSiteStatistics = async (req, res) => {
    try {
        // Most popular movies (based on reviews count)
        const popularMovies = await Movie.aggregate([
            { $lookup: { from: 'reviews', localField: '_id', foreignField: 'movie', as: 'reviews' } },
            { $addFields: { reviewCount: { $size: '$reviews' } } },
            { $sort: { reviewCount: -1 } },
            { $limit: 5 },
            { $project: { title: 1, reviewCount: 1 } },
        ]);

        // Trending genres
        const trendingGenres = await Movie.aggregate([
            { $unwind: '$genre' },
            { $group: { _id: '$genre', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        // Most searched actors
        const searchedActors = await Movie.aggregate([
            { $unwind: '$cast' },
            { $group: { _id: '$cast', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
        ]);

        // User engagement (total reviews, most active users)
        const totalReviews = await Review.countDocuments();
        const mostActiveUsers = await Review.aggregate([
            { $group: { _id: '$user', reviewCount: { $sum: 1 } } },
            { $sort: { reviewCount: -1 } },
            { $limit: 5 },
        ]);

        res.status(200).json({
            popularMovies,
            trendingGenres,
            searchedActors,
            totalReviews,
            mostActiveUsers,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
