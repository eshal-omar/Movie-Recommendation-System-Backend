const hardcodedRecommendations = [
    { title: 'Inception', genre: ['Sci-Fi', 'Thriller'] },
    { title: 'The Dark Knight', genre: ['Action', 'Drama'] },
];

exports.getRecommendations = (userPreferences) => {
    return hardcodedRecommendations.filter((movie) =>
        userPreferences.some((genre) => movie.genre.includes(genre))
    );
};
