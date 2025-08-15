const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Link to Movie model
        required: true
    },
    awards: [{
        name: {
            type: String, // e.g. "Oscar", "Golden Globe"
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        category: {
            type: String, // e.g. "Best Actor", "Best Picture"
            required: true
        },
        result: {
            type: String, // e.g. "Won", "Nominated"
            required: true
        }
    }]
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
