const BoxOffice = require('../models/BoxOffice');

// Add box office details for a movie
const addBoxOffice = async (req, res) => {
    const { movieId, openingWeekendEarnings, totalEarnings, internationalRevenue, domesticRevenue } = req.body;

    try {
        const newBoxOffice = new BoxOffice({
            movie: movieId,
            openingWeekendEarnings,
            totalEarnings,
            internationalRevenue,
            domesticRevenue
        });
        await newBoxOffice.save();
        res.status(201).json({ message: 'Box office data added successfully', newBoxOffice });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get box office details for a specific movie with the movie name
const getBoxOffice = async (req, res) => {
    const { movieId } = req.params;

    try {
        const boxOffice = await BoxOffice.findOne({ movie: movieId }).populate('movie', 'title'); // Populate movie name (assuming field is `title`)
        if (!boxOffice) {
            return res.status(404).json({ message: 'Box office data not found for this movie' });
        }
        res.json(boxOffice);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addBoxOffice, getBoxOffice };
