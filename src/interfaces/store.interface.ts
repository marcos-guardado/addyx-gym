import { IMembershipSlice } from "../features/membershipsType/membersSlice";
import { ITrainersSlice } from "../features/trainers/trainerSlice";
import { IUsersSlice } from "../features/users/userSlice";

export interface IStore {
  users: IUsersSlice;
  membershipType: IMembershipSlice;
  trainers: ITrainersSlice;
}
