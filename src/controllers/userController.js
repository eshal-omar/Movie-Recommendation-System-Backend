const User = require('../models/User');
const Movie = require('../models/Movie');


exports.getUserProfile = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('wishlist', 'title genre director averageRating'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id; 
    const { preferences, wishlist } = req.body;

    try {
        //fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let validMovies = []; 

        //update preferences if provided
        if (preferences) {
            user.preferences = preferences; 
        }

        //update wishlist if provided
        if (wishlist) {
            validMovies = await Movie.find({ _id: { $in: wishlist } }); //fetch valid movies
            user.wishlist = validMovies.map((movie) => movie._id); 
        }

        
        const updatedUser = await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                ...updatedUser._doc,
                wishlist: wishlist ? validMovies : user.wishlist, 
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.addToWishlist = async (req, res) => {
    const { movieId } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //check if the movie already exists in the wishlist
        if (!user.wishlist.includes(movieId)) {
            user.wishlist.push(movieId); 
            await user.save();
        }

        res.status(200).json({ message: 'Movie added to wishlist' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
