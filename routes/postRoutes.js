const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.delete('/:id', auth, deletePost);

module.exports = router;
