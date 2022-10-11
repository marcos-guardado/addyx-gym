//Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
//Interfaces
import { ITrainer } from "../../interfaces/trainers.interface";
//Utils
import {
  deleteTrainer,
  getTrainers,
  patchTrainer,
  postNewTrainer,
} from "../../utils/requests";

export const initTrainers = createAsyncThunk(
  "@trainers/initState",
  async () => {
    const trainers = await getTrainers();
    return trainers;
  }
);

export const saveNewTrainerState = createAsyncThunk(
  "@trainers/saveNewTrainerState",
  async ({ trainerForm }: { trainerForm: Partial<ITrainer> }, thunkAPI) => {
    try {
      const { data } = await postNewTrainer(trainerForm);
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const editTrainerState = createAsyncThunk(
  "@trainers/editTrainerState",
  async ({ trainerData }: { trainerData: Partial<ITrainer> }, thunkAPI) => {
    try {
      const { data } = await patchTrainer(trainerData._id!, trainerData);
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const deleteTrainerState = createAsyncThunk(
  "@trainers/deleteTrainerState",
  async ({ trainerId }: { trainerId: string }, thunkAPI) => {
    try {
      const { data } = await deleteTrainer(trainerId);
      return { data };
    } catch ({ response: { data } }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
