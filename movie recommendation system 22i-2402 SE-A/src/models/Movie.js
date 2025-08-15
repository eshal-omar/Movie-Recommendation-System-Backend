const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [{ type: String }], // Array of genres
    director: { type: String, required: true },
    cast: [{ type: String }], // Array of cast members
    releaseDate: { type: Date, required: true },
    runtime: { type: Number, required: true },
    synopsis: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    movieCoverPhoto: { type: String },
    trivia: [{ type: String }], // Array of trivia strings
    goofs: [{ type: String }], // Array of goof strings
    soundtrack: [{ type: String }], // Array of soundtrack strings
    actorProfiles: [{
        name: { type: String, required: true },
        filmography: [{ type: String }], // List of movies they've worked on
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String } // URL to the actor's photo
    }],
    directorProfiles: [{
        name: { type: String, required: true },
        filmography: [{ type: String }], // List of movies directed
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String } // URL to the director's photo
    }],
    crewProfiles: [{
        name: { type: String, required: true },
        role: { type: String }, // e.g., Cinematographer, Editor
        biography: { type: String },
        awards: [{ type: String }],
        photo: { type: String }
    }],
    ageRating: { type: String }, // e.g., PG, PG-13, R
    parentalGuidance: { type: String } // e.g., "Contains violence and strong language"
});

module.exports = mongoose.model('Movie', movieSchema);
