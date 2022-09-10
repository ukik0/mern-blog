import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/auth.js'
import PostSlice from './slices/post.js'
import commentsReducer from './slices/comments.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: PostSlice,
        comments: commentsReducer
    }
})