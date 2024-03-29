import { Router } from 'express';
import { getPostComments } from '../controllers/comments.js';
import {
  createPost,
  deletePost,
  getAll,
  getById,
  getMyPosts,
  updatePost,
} from '../controllers/posts.js';

import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//CreatePost
router.post('/', checkAuth, createPost);

//Get All
router.get('/', getAll);

//Get By id
router.get(`/:id`, getById);

//Get My Posts
router.get('/user/me', checkAuth, getMyPosts);

//Delete post
router.delete('/:id', checkAuth, deletePost);

//Update Post
router.put('/:id', checkAuth, updatePost);

//Get Post Comments
router.get('/comments/:id', getPostComments);

export default router;
