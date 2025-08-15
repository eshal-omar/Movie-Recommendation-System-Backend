const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Movies', 'Actors', 'Upcoming Projects', 'Industry', 'Other'],
        default: 'Movies',
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
