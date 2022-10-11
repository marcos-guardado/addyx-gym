import axios, { AxiosResponse } from "axios";
import { IMembershipType } from "../interfaces/membershipType.interface";
import { ITrainer } from "../interfaces/trainers.interface";
import { IUsers } from "../interfaces/users.interface";
const url = "http://localhost:2000/api";

export const getUsers = async () => {
  const { data }: AxiosResponse = await axios({
    url: `${url}/getAllUsers`,
    method: "GET",
  });

  return data;
};

export const getTrainers = async () => {
  const { data }: AxiosResponse = await axios({
    url: `${url}/getAllTrainers`,
    method: "GET",
  });

  return data;
};

export const getMembershipType = async () => {
  const { data }: AxiosResponse = await axios({
    url: `${url}/getAllPlans`,
    method: "GET",
  });

  return data;
};

export const postNewUser = async (userData: Partial<IUsers>) => {
  const { data }: AxiosResponse = await axios({
    method: "POST",
    url: `${url}/saveUser`,
    data: userData,
  });

  return { data };
};
export const patchUser = async (userId: string, userData: Partial<IUsers>) => {
  const { data }: AxiosResponse = await axios({
    method: "PATCH",
    url: `${url}/updateUser/${userId}`,
    data: userData,
  });

  return { data };
};

export const deleteUser = async (userId: string) => {
  const { data }: AxiosResponse = await axios({
    method: "DELETE",
    url: `${url}/deleteUser/${userId}`,
  });

  return { data };
};

export const postMembershipType = async (
  planData: Partial<IMembershipType>
) => {
  const { data, status }: AxiosResponse = await axios({
    method: "POST",
    url: `${url}/savePlan`,
    data: planData,
  });
  return { status, data };
};

export const patchMembershipType = async (
  planId: string,
  planData: Partial<IMembershipType>
) => {
  const { data, status }: AxiosResponse = await axios({
    method: "PATCH",
    url: `${url}/updatePlan/${planId}`,
    data: planData,
  });
  return { status, data };
};

export const deleteMembershipType = async (planId: string) => {
  const { data }: AxiosResponse = await axios({
    method: "DELETE",
    url: `${url}/deletePlan/${planId}`,
  });
  return { data };
};

export const postNewTrainer = async (trainerData: Partial<ITrainer>) => {
  const { data, status }: AxiosResponse = await axios({
    method: "POST",
    url: `${url}/saveTrainer`,
    data: trainerData,
  });

  return { status, data };
};
export const patchTrainer = async (
  userId: string,
  trainerData: Partial<ITrainer>
) => {
  const { data }: AxiosResponse = await axios({
    method: "PATCH",
    url: `${url}/updateTrainer/${userId}`,
    data: trainerData,
  });

  return { data };
};

export const deleteTrainer = async (trainerId: string) => {
  const { data, status }: AxiosResponse = await axios({
    method: "DELETE",
    url: `${url}/deleteTrainer/${trainerId}`,
  });

  return { status, data };
};
