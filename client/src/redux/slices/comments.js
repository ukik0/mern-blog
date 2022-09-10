import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const fetchComments = createAsyncThunk('comments/fetchComments', async ({postId, comments}) => {
    try {
        const {data} = await axios.post(`/comments/${postId}}`, {postId, comments})
        return data
    } catch (error) {
        console.log(error)
    }
})

export const fetchPostComments = createAsyncThunk('comments/fetchPostComments', async ({postId}) => {
    try {
        const {data} = await axios.get(`/posts/comments/${postId}`)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: () => {},
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
        },
        [fetchComments.rejected]: () => {},


        [fetchPostComments.pending]: () => {},
        [fetchPostComments.fulfilled]: (state, action) => {
            state.comments = action.payload
        },
        [fetchPostComments.rejected]: () => {}
    }

})


export default commentSlice.reducer

