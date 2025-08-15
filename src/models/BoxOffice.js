const mongoose = require('mongoose');

const boxOfficeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true
    },
    openingWeekendEarnings: {
        type: Number, 
        required: true
    },
    totalEarnings: {
        type: Number, 
        required: true
    },
    internationalRevenue: {
        type: Number, 
        required: true
    },
    domesticRevenue: {
        type: Number, 
        required: true
    },
});

const BoxOffice = mongoose.model('BoxOffice', boxOfficeSchema);

module.exports = BoxOffice;
