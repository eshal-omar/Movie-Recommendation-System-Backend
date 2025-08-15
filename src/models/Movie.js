const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [{ type: String }], 
    director: { type: String, required: true },
    cast: [{ type: String }], 
    releaseDate: { type: Date, required: true },
    runtime: { type: Number, required: true },
    synopsis: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    movieCoverPhoto: { type: String },
    trivia: [{ type: String }], 
    goofs: [{ type: String }], 
    soundtrack: [{ type: String }], 
    actorProfiles: [{
        name: { type: String, required: true },
        filmography: [{ type: String }], 
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String } 
    }],
    directorProfiles: [{
        name: { type: String, required: true },
        filmography: [{ type: String }], 
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String } 
    }],
    crewProfiles: [{
        name: { type: String, required: true },
        role: { type: String }, 
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String }
    }],
    ageRating: { type: String }, 
    parentalGuidance: { type: String } 
});

module.exports = mongoose.model('Movie', movieSchema);
