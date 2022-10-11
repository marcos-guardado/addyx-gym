//Libraries
import { useRef, useState } from "react";
import { FlexboxGrid, IconButton } from "rsuite";
import { AddOutline } from "@rsuite/icons";
//Redux
import { useAppDispatch } from "../../../../app/hooks/hooks";
import {
  initTrainers,
  saveNewTrainerState,
} from "../../../../features/trainers/trainerReducer";
//Interfaces
import { ITrainer } from "../../../../interfaces/trainers.interface";
//Components
import { EditTrainerForm } from "../EditTrainer/EditTrainer";
//Utils

export default function AddNewTrainer() {
  const dispatch = useAppDispatch();
  const trainerFormRef: any = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trainerForm, setTrainerForm] = useState<Partial<ITrainer>>({
    firstName: "",
    lastName: "",
  });

  const onSubmit = async () => {
    if (!trainerFormRef.current.check()) return;
    if (Object.keys(trainerForm).length <= 0) return;
    await dispatch(saveNewTrainerState({ trainerForm: trainerForm }));
    dispatch(initTrainers());
    setIsOpen(false);
    setTrainerForm({
      firstName: "",
      lastName: "",
    });
  };

  return (
    <FlexboxGrid className="suscribe-container">
      <FlexboxGrid.Item colspan={24}>
        <IconButton
          onClick={() => setIsOpen(true)}
          icon={<AddOutline />}
          appearance="primary"
          color="green"
        >
          Add Trainer
        </IconButton>
      </FlexboxGrid.Item>
      <EditTrainerForm
        ref={trainerFormRef}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        trainerForm={trainerForm}
        handleSubmit={onSubmit}
        onChange={(data) => setTrainerForm(data)}
      />
    </FlexboxGrid>
  );
}
