//Libraries
import { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
//Redux
import { useAppSelector } from "../../app/hooks/hooks";
import { IStore } from "../../interfaces/store.interface";
//Utils
import { createToast } from "../../utils/createToast";
//Components
import AddNewTrainer from "./Components/AddNewTrainer/AddNewTrainer";
import TrainersTable from "./Components/TrainersTable/TrainersTable";

export default function TrainersManagement() {
  const responseMessage = useAppSelector(
    ({ trainers: { responseMessage } }:IStore) => responseMessage
  );

  useEffect(() => {
    createToast(responseMessage);
  }, [responseMessage]);

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24}>
        <AddNewTrainer />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        <TrainersTable />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
