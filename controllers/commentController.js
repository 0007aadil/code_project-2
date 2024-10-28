const Comment = require('../models/Comment');
const Post = require('../models/Post');

const addComment = async (req, res) => {
  const { postId, text, rating } = req.body;
  try {
    const comment = await Comment.create({
      text,
      rating,
      post: postId,
      user: req.user.id,
    });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addComment };
