const Discussion = require('../models/Discussion');

// Create a discussion
exports.createDiscussion = async (req, res) => {
    const { title, content, movie, genre, actor } = req.body;

    try {
        const discussion = new Discussion({
            title,
            content,
            movie,
            genre,
            actor,
            user: req.user.id, // Assume user is authenticated
        });

        await discussion.save();

        res.status(201).json({ message: 'Discussion created successfully', discussion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Add a comment to a discussion
exports.addComment = async (req, res) => {
    const { discussionId } = req.params;
    const { content } = req.body;

    try {
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }

        discussion.comments.push({
            user: req.user.id, // Assume user is authenticated
            content,
        });

        await discussion.save();

        res.status(200).json({ message: 'Comment added successfully', discussion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get discussions by movie, genre, or actor
exports.getDiscussions = async (req, res) => {
    const { movie, genre, actor } = req.query;

    try {
        const filter = {};
        if (movie) filter.movie = movie;
        if (genre) filter.genre = genre;
        if (actor) filter.actor = actor;

        const discussions = await Discussion.find(filter).populate('user', 'name').populate('comments.user', 'name');

        res.status(200).json({ discussions });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
