const mongoose = require('mongoose');

const upcomingMovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Reference to User model
});

module.exports = mongoose.model('UpcomingMovie', upcomingMovieSchema);
