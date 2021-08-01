import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apiService from '../../services/api'

export const getPosts = createAsyncThunk('post/fetchPosts', () => {
  return apiService.fetchPosts()
})

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
  },
})

export const selectPost = (state) => state.post

export default postSlice.reducer
