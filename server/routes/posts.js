import {Router} from 'express'
import { createPost, getAll, getById, getMyPosts } from '../controllers/posts.js'

import { checkAuth } from '../utils/checkAuth.js'

const router = Router()

//CreatePost
router.post('/', checkAuth, createPost)

//Get All
router.get('/', getAll)

//Get By id
router.get(`/:id`, getById)

//Get My Posts
router.get('/user/me', checkAuth, getMyPosts)


export default router