const Award = require('../models/Award');

// Add awards for a movie
const addAwards = async (req, res) => {
    const { movieId, awards } = req.body;  // awards should be an array of award objects

    try {
        const newAwards = new Award({
            movie: movieId,
            awards
        });
        await newAwards.save();
        res.status(201).json({ message: 'Awards data added successfully', newAwards });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get awards for a specific movie with the movie name
const getAwards = async (req, res) => {
    const { movieId } = req.params;

    try {
        const awards = await Award.findOne({ movie: movieId }).populate('movie', 'title'); // Populate movie name (assuming field is `title`)
        if (!awards) {
            return res.status(404).json({ message: 'Awards data not found for this movie' });
        }
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addAwards, getAwards };
