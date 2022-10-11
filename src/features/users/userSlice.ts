//Redux
import { createSlice } from "@reduxjs/toolkit";
//Interfaces
import { IUsers } from "../../interfaces/users.interface";
//Actions
import {
  deleteUsersState,
  editUsersState,
  initUsersState,
  saveNewUserState,
} from "./usersReducers";

export interface IUsersSlice {
  users: IUsers[];
  loading: "idle" | "pending" | "success";
  responseMessage: string | null;
}

const initialState: IUsersSlice = {
  loading: "idle",
  responseMessage: null,
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //InitUsers
    builder.addCase(initUsersState.fulfilled, (state, { payload }) => {
      state.users = [...payload];
      state.responseMessage = null;
    });

    //SaveNewUser
    builder.addCase(saveNewUserState.pending, (state, { payload }) => {
      state.loading = "pending";
    });
    builder.addCase(
      saveNewUserState.fulfilled,
      (state, { payload: { data } }) => {
        state.loading = "success";
        state.responseMessage = data;
      }
    );
    builder.addCase(saveNewUserState.rejected, (state, { payload }: any) => {
      state.responseMessage = payload;
    });

    //EditUser
    builder.addCase(editUsersState.pending, (state, { payload }) => {
      state.loading = "pending";
    });
    builder.addCase(
      editUsersState.fulfilled,
      (state, { payload: { data } }) => {
        state.loading = "success";
        state.responseMessage = data;
      }
    );
    builder.addCase(editUsersState.rejected, (state, { payload }: any) => {
      state.responseMessage = payload;
    });

    //DeleteUser
    builder.addCase(
      deleteUsersState.fulfilled,
      (state, { payload: { data } }: any) => {
        state.responseMessage = data;
      }
    );
    builder.addCase(deleteUsersState.rejected, (state, { payload }: any) => {
      state.responseMessage = payload;
    });
  },
});

export default usersSlice.reducer;
