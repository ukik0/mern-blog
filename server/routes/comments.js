import {Router} from 'express'

import { createComments } from '../controllers/comments.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router()


router.post('/:id', checkAuth, createComments)

export default router;