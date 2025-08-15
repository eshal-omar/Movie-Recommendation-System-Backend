const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 500,
    },likes: {
    type: Number,
    default: 0,  // Track likes for most-discussed reviews
    },
}, { timestamps: true });

reviewSchema.index({ user: 1, movie: 1 }, { unique: true }); // Ensure a user can only review a movie once

module.exports = mongoose.model('Review', reviewSchema);
