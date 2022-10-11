import { IMembershipType } from "../interfaces/membershipType.interface";

export const validateIfPlanExists = (
  plan: string,
  membershipsType: IMembershipType[]
) => {
  const exist: number = membershipsType.findIndex(
    ({ name }: IMembershipType) => name === plan
  );
  if (exist !== -1) {
    return plan;
  }
  return "Without plan assigned";
};
