import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apiService from '../../services/api'

export const signInWithGoogle = createAsyncThunk(
  'user/signInWithGoogle',
  () => {
    return apiService.signInWithGoogle()
  }
)

export const signOut = createAsyncThunk('post/signOut', () => {
  return apiService.signOut()
})

export const toggleBookmarkPost = createAsyncThunk(
  'post/toggleBookmarkPost',
  ({ email, postId, isBookmarked }) => {
    return apiService.toggleBookmarkPost({ isBookmarked, email, postId })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    removeUser(state) {
      state.user = {}
      state.isAuthenticated = false
    },
  },
  extraReducers: {
    [signInWithGoogle.fulfilled](state, action) {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false

      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    [signInWithGoogle.pending](state) {
      state.loading = true
    },
    [signInWithGoogle.rejected](state, action) {
      state.error = action.payload
      state.loading = false
      state.isAuthenticated = false
      state.user = {}

      localStorage.removeItem('user')
    },
    [signOut.fulfilled](state, action) {
      state.user = {}
      state.isAuthenticated = false

      localStorage.removeItem('user')
    },
    [toggleBookmarkPost.fulfilled](state, action) {
      state.user = action.payload
      console.log(`action.payload`, action.payload)
    },
    [toggleBookmarkPost.rejected](state, action) {
      state.error = action.error.message
    },
  },
})

export const selectUser = (state) => state.user
export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
