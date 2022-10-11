import { configureStore } from "@reduxjs/toolkit";
//Slices
import membershipTypeSlice from "../features/membershipsType/membersSlice";
import usersSlice from "../features/users/userSlice";
import trainersSlice from "../features/trainers/trainerSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    membershipType: membershipTypeSlice,
    trainers: trainersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
