const User = require('../models/User');
const Movie = require('../models/Movie');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Fetch user details excluding the password field
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('wishlist', 'title genre director averageRating'); // Populate wishlist with movie details

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user profile
// Update user profile
exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; // Assume `req.user` is set by JWT middleware
    const { preferences, wishlist } = req.body;

    try {
        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let validMovies = []; // Initialize validMovies

        // Update preferences if provided
        if (preferences) {
            user.preferences = preferences; // Overwrite preferences
        }

        // Update wishlist if provided
        if (wishlist) {
            validMovies = await Movie.find({ _id: { $in: wishlist } }); // Fetch valid movies
            user.wishlist = validMovies.map((movie) => movie._id); // Replace wishlist with valid IDs
        }

        // Save the updated user
        const updatedUser = await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                ...updatedUser._doc,
                wishlist: wishlist ? validMovies : user.wishlist, // Return validMovies if wishlist updated
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
    const { movieId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the movie already exists in the wishlist
        if (!user.wishlist.includes(movieId)) {
            user.wishlist.push(movieId); // Add the movie to the wishlist
            await user.save();
        }

        res.status(200).json({ message: 'Movie added to wishlist' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
