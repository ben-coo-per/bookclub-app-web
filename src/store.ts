import { configureStore } from "@reduxjs/toolkit";
import readingReducer from "src/features/readings/readingSlice";

export const store = configureStore({
  reducer: {
    readings: readingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
