import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/post'

const store = configureStore({
  reducer: {
    post: postReducer,
  },
})

export default store
