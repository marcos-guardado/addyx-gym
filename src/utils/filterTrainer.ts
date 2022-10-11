import { ITrainer } from "../interfaces/trainers.interface";

export const filterTrainer = (trainerId: string, trainers: ITrainer[]) => {
  const trainer = trainers.find((trainer) => trainer._id === trainerId);
  return trainer
    ? trainer
    : {
        firstName: "",
        lastName: "",
        photo: "",
      };
};
