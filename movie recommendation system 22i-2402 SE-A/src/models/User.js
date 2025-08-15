const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    preferences: { 
        type: Array, 
        default: [], 
        validate: [arrayLimit, 'Exceeds the limit of preferences'] 
    }, // E.g., ["Sci-Fi", "Action", "Brad Pitt"]
    wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie' 
    }],
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 10; // Limit preferences to a maximum of 10
}

module.exports = mongoose.model('User', userSchema);
