const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', default: null },
    genre: { type: String, default: null },
    actor: { type: String, default: null },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Discussion', discussionSchema);
