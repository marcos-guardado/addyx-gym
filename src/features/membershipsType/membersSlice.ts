//Redux
import { createSlice } from "@reduxjs/toolkit";
//Interfaces
import { IMembershipType } from "../../interfaces/membershipType.interface";
//Actions
import {
  deleteMembershipTypeAPI,
  editMembershipType,
  initMembershipType,
  saveNewMembershipType,
} from "./membersReducer";

export interface IMembershipSlice {
  membershipsType: IMembershipType[];
  loading: "idle" | "pending" | "success";
  responseMessage: string | null;
}

const initialState: IMembershipSlice = {
  membershipsType: [],
  loading: "idle",
  responseMessage: null,
};

export const membershipTypeSlice = createSlice({
  name: "membershipType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Initmemberships
    builder.addCase(initMembershipType.fulfilled, (state, { payload }) => {
      state.responseMessage = null;
      state.loading = "success";
      state.membershipsType = [...payload];
    });

    builder.addCase(initMembershipType.pending, (state) => {
      state.loading = "pending";
    });

    //SaveNewMembership
    builder.addCase(saveNewMembershipType.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(saveNewMembershipType.fulfilled, (state, { payload }) => {
      state.loading = "success";
      state.responseMessage = payload;
    });

    builder.addCase(
      saveNewMembershipType.rejected,
      (state, { payload }: any) => {
        state.loading = "success";
        state.responseMessage = payload;
      }
    );

    //EditMembership
    builder.addCase(editMembershipType.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(editMembershipType.fulfilled, (state, { payload }) => {
      state.loading = "success";
      state.responseMessage = payload;
    });

    builder.addCase(editMembershipType.rejected, (state, { payload }: any) => {
      state.loading = "success";
      state.responseMessage = payload;
    });

    //DeleteMembership
    builder.addCase(deleteMembershipTypeAPI.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(deleteMembershipTypeAPI.fulfilled, (state, { payload }) => {
      state.loading = "success";
      state.responseMessage = payload;
    });
    builder.addCase(deleteMembershipTypeAPI.rejected, (state, { payload }) => {
      state.responseMessage = String(payload);
    });
  },
});

export default membershipTypeSlice.reducer;
