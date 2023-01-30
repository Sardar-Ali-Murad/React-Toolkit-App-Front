import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/user/userSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import {Api}  from "../services/Api"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(Api.middleware),
})

setupListeners(store.dispatch)