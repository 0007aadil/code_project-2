const express = require('express');
const { addComment } = require('../controllers/commentController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', auth, addComment);

module.exports = router;
