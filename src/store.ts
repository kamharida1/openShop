import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/category/categorySlice"
import brandsReducer from "./features/brand/brandSlice"
import prototypesReducer from "./features/prototype/prototypeSlice"

export const store =  configureStore({
  reducer: {
    categories: categoriesReducer,
    brands: brandsReducer,
    prototypes: prototypesReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
