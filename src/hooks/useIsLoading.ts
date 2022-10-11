import { useAppSelector } from "../app/hooks/hooks";

export function useIsLoading(loaderOwner: "membershipType" | "users") {
  const isLoading = useAppSelector((state) =>
    state[loaderOwner].loading === "pending" ? true : false
  );

  return isLoading;
}
