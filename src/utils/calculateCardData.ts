import { IMembershipType } from "../interfaces/membershipType.interface";
import { IUsers } from "../interfaces/users.interface";

export const calculateCurrentIncome = (
  users: IUsers[],
  membershipType: IMembershipType[]
) => {
  let totalSum = 0;
  if (membershipType.length < 1 && users.length < 1) return totalSum;
  const membershipByUser: string[] = users.map(
    ({ suscriptionType }: IUsers) => {
      return suscriptionType;
    }
  );
  membershipByUser.forEach((_id: string) => {
    const type = membershipType.find(
      (member: IMembershipType) => member._id === _id
    );
    totalSum += type ? type.price : 0;
  });
  return totalSum;
};

export const calculateJoinedThisMonth = (users: IUsers[]) => {
  if (users.length < 1) return 0;
  let year = new Date().getFullYear();
  let month = new Date().getUTCMonth() + 1;
  let totalJoinedThisMonth = 0;
  users.forEach(({ start_date }: any) => {
    let userStartYear = parseInt(start_date.split("-")[0]);
    let userStartMonth = parseInt(start_date.split("-")[1]);
    if (year === userStartYear && month === userStartMonth) {
      totalJoinedThisMonth++;
    }
  });
  return totalJoinedThisMonth;
};
