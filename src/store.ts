import { configureStore } from "@reduxjs/toolkit";
import currentReadingReducer from "src/features/readings/currentReadingSlice";
import previousReadingReducer from "src/features/readings/previousReadingSlice";
import meetingsReducer from "src/features/meetings/meetingSlice";

export const store = configureStore({
  reducer: {
    currentReadings: currentReadingReducer,
    previousReadings: previousReadingReducer,
    meetings: meetingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
