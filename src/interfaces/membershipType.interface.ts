export interface IMembershipType {
  _id: string;
  name: string;
  price: number;
}

export interface IMembershipTypeState {
  membershipType: IMembershipType[];
  loading: "pending" | "idle" | "success";
}
