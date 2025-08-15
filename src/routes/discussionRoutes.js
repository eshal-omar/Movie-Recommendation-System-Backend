const express = require('express');
const { createDiscussion, addComment, getDiscussions } = require('../controllers/discussionController');
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/', authMiddleware(), createDiscussion);
router.post('/:discussionId/comments', authMiddleware(), addComment);
router.get('/', getDiscussions);

module.exports = router;
