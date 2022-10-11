import { IMembershipType } from "../interfaces/membershipType.interface";

export const filterPlan = (planId: string, plans: IMembershipType[]) => {
  const plan = plans.find((plan) => plan._id === planId);
  return plan
    ? plan
    : {
        name: "",
        price: 0,
      };
};
