import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/post'
import userReducer from './slices/user'

const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
})

export default store
