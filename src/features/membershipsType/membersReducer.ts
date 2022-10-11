//Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
//Interfaces
import { IMembershipType } from "../../interfaces/membershipType.interface";
//Utils
import {
  deleteMembershipType,
  getMembershipType,
  patchMembershipType,
  postMembershipType,
} from "../../utils/requests";

export const initMembershipType = createAsyncThunk(
  "@membership/initState",
  async () => {
    const membershipType = await getMembershipType();
    return membershipType;
  }
);

export const saveNewMembershipType = createAsyncThunk(
  "@membership/saveNewMembershipType",
  async (newPlan: Partial<IMembershipType>, thunkAPI) => {
    try {
      const { data } = await postMembershipType(newPlan);
      return data;
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const editMembershipType = createAsyncThunk(
  "@membership/editMembershipType",
  async (
    {
      planId,
      plan,
    }: {
      planId: string;
      plan: Partial<IMembershipType>;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await patchMembershipType(planId, plan);
      return data;
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const deleteMembershipTypeAPI = createAsyncThunk(
  "@membership/deleteMembershipType",
  async (planId: string, thunkAPI) => {
    try {
      const { data }: any | undefined = await deleteMembershipType(planId);
      return data;
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
