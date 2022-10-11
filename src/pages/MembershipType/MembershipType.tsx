//Libraries
import { FlexboxGrid, IconButton } from "rsuite";
import { useEffect, useState } from "react";
//Redux
import { useAppSelector } from "../../app/hooks/hooks";
//Style
import "./MembershipType.css";
//Icons
import { ExpandOutline } from "@rsuite/icons";
//Components
import MembershipTypeTable from "./Components/MembershipTypeTable/MembershipTypeTable";
import ManagePlanModal from "./Components/ManagePlanModal/ManagePlanModal";
//Utils
import { createToast } from "../../utils/createToast";
//Interfaces
import { IStore } from "../../interfaces/store.interface";

export default function MembershipType() {
  const responseMessage = useAppSelector(
    ({ membershipType: { responseMessage } }: IStore) => responseMessage
  );

  useEffect(() => {
    createToast(responseMessage);
  }, [responseMessage]);

  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  return (
    <FlexboxGrid align="middle" className="membership-type-container">
      <FlexboxGrid.Item className="membership-button">
        <IconButton
          appearance="primary"
          color="green"
          icon={<ExpandOutline />}
          onClick={onOpen}
        >
          Add new plan
        </IconButton>
        <ManagePlanModal open={open} handleClose={onClose} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        <MembershipTypeTable />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
