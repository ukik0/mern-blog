import CommentsModel from '../models/Comments.js';
import PostModel from '../models/Post.js';

export const createComments = async (req, res) => {
  try {
    const { postId, comments } = req.body;

    if (!comments) res.json({ message: 'Комментарий не может быть пустым' });

    const newComment = new CommentsModel({ comment: comments });
    await newComment.save();

    try {
      await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.json({ message: 'Что то пошло не так' });
  }
};

export const getPostComments = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
        const list = await Promise.all(post.comments.map((comment) => {
            return CommentsModel.findById(comment)
        }))
        
        res.json(list)
    } catch (error) {
        console.log(error)
    }
}
