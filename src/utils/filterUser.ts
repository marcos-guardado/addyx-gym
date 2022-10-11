import { IUsers } from "../interfaces/users.interface";

export const filterUser = (userId: string, users: IUsers[]) => {
  const user = users.find((user) => user._id === userId);
  return user
    ? user
    : {
        firstName: "",
        lastName: "",
        suscriptionType: "",
        start_date: "",
        end_date: "",
      };
};
