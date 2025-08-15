const mongoose = require('mongoose');

const customListSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        maxlength: 500
    },
    movies: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie' 
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

module.exports = mongoose.model('List', customListSchema);
