const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Assuming you have a 'Movie' model to link with
        required: true
    },
    openingWeekendEarnings: {
        type: Number, // e.g. earnings in millions
        required: true
    },
    totalEarnings: {
        type: Number, // Total box office earnings in millions
        required: true
    },
    internationalRevenue: {
        type: Number, // International earnings in millions
        required: true
    },
    domesticRevenue: {
        type: Number, // Domestic earnings in millions
        required: true
    },
});

const BoxOffice = mongoose.model('BoxOffice', boxOfficeSchema);

module.exports = BoxOffice;
