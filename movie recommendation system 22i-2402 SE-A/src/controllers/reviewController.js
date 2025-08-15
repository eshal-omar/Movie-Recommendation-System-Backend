const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Add or update a review
exports.addOrUpdateReview = async (req, res) => {
    const { movieId, rating, comment,likes } = req.body;
    try {
        const review = await Review.findOneAndUpdate(
            { user: req.user.id, movie: movieId },
            { rating, comment,likes },
            { new: true, upsert: true }
        );

        // Update average rating for the movie
        const reviews = await Review.find({ movie: movieId });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Movie.findByIdAndUpdate(movieId, { averageRating });

        res.status(200).json({ message: 'Review saved successfully', review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get reviews for a movie
exports.getMovieReviews = async (req, res) => {
    const { movieId } = req.params;
    //const { likes } = req.body;
    try {
        // Fetch all reviews for the movie
        const reviews = await Review.find({ movie: movieId }).populate('user', 'name');

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this movie' });
        }

        // Calculate the top-rated review
        const topRatedReview = reviews.reduce((highest, review) => {
            return review.rating > highest.rating ? review : highest;
        });

        // Calculate the most-discussed review (based on likes or number of comments)
        const mostDiscussedReview = reviews.reduce((mostDiscussed, review) => {
            return review.likes > mostDiscussed.likes ? review : mostDiscussed;
        });

        // Prepare the response with reviews and highlights
        res.json({
            reviews,
            reviewHighlights: {
                topRatedReview,
                mostDiscussedReview
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await review.remove();

        // Update average rating for the movie
        const reviews = await Review.find({ movie: review.movie });
        const averageRating = reviews.length
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
        await Movie.findByIdAndUpdate(review.movie, { averageRating });

        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
