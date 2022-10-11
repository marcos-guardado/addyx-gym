//Redux
import { createSlice } from "@reduxjs/toolkit";
//Interfaces
import { ITrainer } from "../../interfaces/trainers.interface";
//Actions
import {
  deleteTrainerState,
  editTrainerState,
  initTrainers,
  saveNewTrainerState,
} from "./trainerReducer";

export interface ITrainersSlice {
  trainers: ITrainer[];
  loading: "idle" | "pending" | "success";
  responseMessage: string | null;
}

const initialState: ITrainersSlice = {
  loading: "idle",
  responseMessage: null,
  trainers: [],
};

const trainersSlice = createSlice({
  name: "trainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initTrainers.fulfilled, (state, { payload }) => {
      state.trainers = [...payload];
      state.responseMessage = null;
    });

    //SAVE TRAINER
    builder.addCase(saveNewTrainerState.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(saveNewTrainerState.rejected, (state, { payload }: any) => {
      state.loading = "pending";
      state.responseMessage = payload;
    });

    builder.addCase(
      saveNewTrainerState.fulfilled,
      (state, { payload: { data } }: any) => {
        state.loading = "success";
        state.responseMessage = data;
      }
    );

    //EDIT TRAINER
    builder.addCase(editTrainerState.pending, (state) => {
      state.loading = "pending";
    });

    builder.addCase(
      editTrainerState.fulfilled,
      (state, { payload: { data } }: any) => {
        state.loading = "success";
        state.responseMessage = data;
      }
    );

    builder.addCase(editTrainerState.rejected, (state, { payload }: any) => {
      state.loading = "success";
      state.responseMessage = payload;
    });
    //DELETE TRAINER
    builder.addCase(
      deleteTrainerState.fulfilled,
      (state, { payload: { data } }: any) => {
        state.loading = "success";
        state.responseMessage = data;
      }
    );
    builder.addCase(deleteTrainerState.rejected, (state, { payload }: any) => {
      state.loading = "success";
      state.responseMessage = payload;
    });
  },
});

export default trainersSlice.reducer;
