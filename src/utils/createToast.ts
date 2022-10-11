import { toast } from "react-toastify";

export const createToast = (resCode: any) => {
  if (resCode === "PD") {
    toast.success("Plan has been deleted");
  }
  if (resCode === "PIU") {
    toast.warning("Plan is used by one or more users");
  }
  if (resCode === "PS") {
    toast.success("Plan saved");
  }
  if (resCode === "PU") {
    toast.success("Plan updated");
  }
  if (resCode === "PNS") {
    toast.success("Plan not saved, try again");
  }
  if (resCode === "PNU") {
    toast.error("Plan not updated, try again");
  }
  if (resCode === "US") {
    toast.success("User saved");
  }
  if (resCode === "UP") {
    toast.success("User Updated");
  }
  if (resCode === "UD") {
    toast.success("User has been deleted");
  }
  if (resCode === "UNS") {
    toast.error("User not saved");
  }
  if (resCode === "UNP") {
    toast.error("User not Updated");
  }
  if (resCode === "UND") {
    toast.error("Couldn't delete this user, try again");
  }
  if (resCode === "TS") {
    toast.success("Trainer saved");
  }
  if (resCode === "TU") {
    toast.success("Trainer Updated");
  }
  if (resCode === "TD") {
    toast.success("Trainer has been deleted");
  }
  if (resCode === "TNS") {
    toast.error("Trainer not saved");
  }
  if (resCode === "TNU") {
    toast.error("Trainer not Updated");
  }
  if (resCode === "TND") {
    toast.error("Couldn't delete this trainer, try again");
  }
};
