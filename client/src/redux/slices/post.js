import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from '../../utils/axios'

export const fetchCreate = createAsyncThunk('post/fetchCreate', async (params) => {

    try {
        const {data} = await axios.post('/posts', params)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const fetchDeletePost = createAsyncThunk('/post/fetchDeletePost', async (id) => {
    try {
        const {data} = axios.delete(`/posts/${id}`, id)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const fetchUpdate = createAsyncThunk('/post/fetchUpdate', async (updatedPost) => {
    try {
        const {data} = axios.put(`/posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const PostSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        popularPosts: [],
        loading: false,
        status: null
    },
    reducers: {

    },
    extraReducers: {
        //Create post
        [fetchCreate.pending]: (state) => {
            state.loading = true
        },
        [fetchCreate.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
            state.status = action.payload.message
        },
        [fetchCreate.rejected]: (state) => {
            state.loading = false
        },
        //Get All Posts
        [fetchPosts.pending]: (state) => {
            state.loading = true
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
            state.status = action.payload.message
        },
        [fetchPosts.rejected]: (state) => {
            state.loading = false
        },

        //Delete Post
        [fetchDeletePost.pending]: (state) => {
            state.loading = true
        },
        [fetchDeletePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post._id !== action.payload._id)
        },
        [fetchDeletePost.rejected]: (state) => {
            state.loading = false
        },


        //Update Post
        [fetchUpdate.pending]: (state) => {
            state.loading = true
        },
        [fetchUpdate.fulfilled]: (state, action) => {
            state.loading = false
            const idx = state.posts.findIndex((post) => post._id === action.payload._id)
            state.posts[idx] = action.payload
            
        },
        [fetchUpdate.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default PostSlice.reducer
