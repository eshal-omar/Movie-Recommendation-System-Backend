const Review = require('../models/Review');
const Movie = require('../models/Movie');


exports.addOrUpdateReview = async (req, res) => {
    const { movieId, rating, comment,likes } = req.body;
    try {
        const review = await Review.findOneAndUpdate(
            { user: req.user.id, movie: movieId },
            { rating, comment,likes },
            { new: true, upsert: true }
        );

        
        const reviews = await Review.find({ movie: movieId });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Movie.findByIdAndUpdate(movieId, { averageRating });

        res.status(200).json({ message: 'Review saved successfully', review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getMovieReviews = async (req, res) => {
    const { movieId } = req.params;
    //const { likes } = req.body;
    try {
        //fetch all reviews for the movie
        const reviews = await Review.find({ movie: movieId }).populate('user', 'name');

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this movie' });
        }

        
        const topRatedReview = reviews.reduce((highest, review) => {
            return review.rating > highest.rating ? review : highest;
        });

        const mostDiscussedReview = reviews.reduce((mostDiscussed, review) => {
            return review.likes > mostDiscussed.likes ? review : mostDiscussed;
        });

        
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

exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await review.remove();

        //update average rating for the movie
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
