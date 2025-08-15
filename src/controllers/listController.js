const CustomList = require('../models/List');
const Movie = require('../models/Movie');


exports.createCustomList = async (req, res) => {
    const { name, description, movieIds } = req.body;
    try {
        const list = await CustomList.create({
            user: req.user.id,
            name,
            description,
            movies: movieIds,  
        });
        res.status(201).json({ message: 'Custom list created successfully', list });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.followCustomList = async (req, res) => {
    const { listId } = req.params;
    try {
        const list = await CustomList.findById(listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

       
        if (!list.followers.includes(req.user.id)) {
            list.followers.push(req.user.id);
            await list.save();
        }

        res.json({ message: 'Followed the custom list successfully', list });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.addMovieToCustomList = async (req, res) => {
    const { listId, movieId } = req.params;
    try {
        const list = await CustomList.findById(listId);
        const movie = await Movie.findById(movieId);

        if (!list || !movie) return res.status(404).json({ message: 'List or Movie not found' });

       
        if (!list.movies.includes(movieId)) {
            list.movies.push(movieId);
            await list.save();
        }

        res.json({ message: 'Movie added to the custom list successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllLists = async (req, res) => {
    try {
        const { userId } = req.query; 
        let query = {};
        if (userId) {
            query.user = userId;
        }

        const lists = await CustomList.find(query).populate('movies', 'title genre averageRating');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};