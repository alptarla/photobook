import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apiService from '../../services/api'

export const getPosts = createAsyncThunk('post/fetchPosts', ({ filters }) => {
  return apiService.fetchPosts(filters)
})

export const toggleLikePost = createAsyncThunk(
  'post/toggleLikePost',
  ({ email, postId, isLiked }) => {
    return apiService.toggleLikePost({ isLiked, email, postId })
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getPosts.fulfilled](state, action) {
      state.posts = action.payload
      state.loading = false
    },
    [getPosts.pending](state) {
      state.loading = true
    },
    [getPosts.rejected](state, action) {
      state.loading = false
      state.error = action.error.message
    },
    [toggleLikePost.fulfilled](state, action) {
      const existingPost = state.posts.find((p) => p.id === action.payload.id)
      existingPost.likes = action.payload.likes

      state.posts = state.posts.map((p) =>
        p.id === existingPost.id ? existingPost : p
      )
    },
    [toggleLikePost.rejected](state, action) {
      state.error = action.error.message
    },
  },
})

export const selectPost = (state) => state.post

export default postSlice.reducer
