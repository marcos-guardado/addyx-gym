//Libraries
import { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
//Redux
import { useAppSelector } from "../../app/hooks/hooks";
import { IStore } from "../../interfaces/store.interface";
//Utils
import { createToast } from "../../utils/createToast";
//Components
import AddNewMember from "./Components/AddNewMember/AddNewMember";
import UsersTable from "./Components/UsersTable/UsersTable";

export default function MembersManagement() {
  const responseMessage = useAppSelector(
    ({ users: { responseMessage } }: IStore) => responseMessage
  );

  useEffect(() => {
    createToast(responseMessage);
  }, [responseMessage]);

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24}>
        <AddNewMember />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        <UsersTable />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
