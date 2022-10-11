import { IMembershipType } from "../interfaces/membershipType.interface";
import { IUsers } from "../interfaces/users.interface";

export const formatUsersToDataTable = (users: IUsers[], plans: IMembershipType[]) => {
  return users.map((user) => ({
    ...user,
    suscriptionType: plans.find(
      (plan) => plan._id.toString() === user.suscriptionType
    )?.name,
  }));
};
