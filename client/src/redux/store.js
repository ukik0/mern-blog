import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/auth.js'
import PostSlice from './slices/post.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: PostSlice
    }
})