import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUsers } from "../../interfaces/users.interface";
import {
  deleteUser,
  getUsers,
  patchUser,
  postNewUser,
} from "../../utils/requests";

export const initUsersState = createAsyncThunk("@users/initState", async () => {
  const users = await getUsers();
  return users;
});

export const saveNewUserState = createAsyncThunk(
  "@users/saveNewUserState",
  async ({ userData }: { userData: Partial<IUsers> }, thunkAPI) => {
    try {
      const { data }:{ data: string } = await postNewUser(userData);
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const editUsersState = createAsyncThunk(
  "@users/editUsersState",
  async ({ userData }: { userData: Partial<IUsers> }, thunkAPI) => {
    try {
      const { data }: { data: string } = await patchUser(
        userData._id!,
        userData
      );
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const deleteUsersState = createAsyncThunk(
  "@users/deleteUsersState",
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      const { data }:{ data: string } = await deleteUser(userId);
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
