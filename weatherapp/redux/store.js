import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import detailReducer from './detailSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    detail:detailReducer
  },
})