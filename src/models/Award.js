const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', 
        required: true
    },
    awards: [{
        name: {
            type: String, 
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        category: {
            type: String, 
            required: true
        },
        result: {
            type: String, 
            required: true
        }
    }]
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
