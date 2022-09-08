import PostModel from '../models/Post.js';
import UserModel from '../models/User.js';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const createPost = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const { title, text } = req.body;

    if (req.files) {
      const fileName = req.files.image.name + Date.now().toString();
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

      const PostWithImage = new PostModel({
        username: user.username,
        title,
        text,
        imageUrl: fileName,
        author: req.userId,
      });

      await PostWithImage.save();
      await UserModel.findOneAndUpdate(req.userId, {
        $push: { posts: PostWithImage },
      });

      return res.json({ PostWithImage, message: 'Создан пост с картинкой' });
    }

    const PostWithoutImage = new PostModel({
      username: user.username,
      title,
      text,
      imageUrl: '',
      author: req.userId,
    });
    await PostWithoutImage.save();
    await UserModel.findOneAndUpdate(req.userId, {
      $push: { posts: PostWithoutImage },
    });

    return res.json({ PostWithoutImage, message: 'Создан пост без картинки' });
  } catch (error) {
    console.log(error);
    res.json({ mewssge: 'Ошибка при создании поста' });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().sort('-createdAt');
    const popularPosts = await PostModel.find().limit(5).sort('-views');

    if (!posts) res.json({ message: 'Посты не найдены' });

    res.json({ posts, popularPosts });
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const postList = await Promise.all(
      user.posts.map((post) => {
        return PostModel.findById(post._id);
      }),
    );
    res.json(postList);
  } catch (error) {
    console.log(error);
  }
};
