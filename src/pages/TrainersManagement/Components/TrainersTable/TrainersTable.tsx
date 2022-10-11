//Libraries
import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  CellProps,
  Divider,
  FlexboxGrid,
  IconButton,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { Edit, Trash } from "@rsuite/icons";
//Redux
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
import { EditTrainerForm } from "../EditTrainer/EditTrainer";
import {
  deleteTrainerState,
  editTrainerState,
  initTrainers,
} from "../../../../features/trainers/trainerReducer";
//Utils
import { useIsLoading } from "../../../../hooks/useIsLoading";
import { filterTrainer } from "../../../../utils/filterTrainer";
//Interfaces
import { ITrainer } from "../../../../interfaces/trainers.interface";
import { IStore } from "../../../../interfaces/store.interface";

export default function TrainersTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trainerData, setTrainerData] = useState<Partial<ITrainer>>({
    firstName: "",
    lastName: "",
  });
  const dispatch = useAppDispatch();
  const trainerFormRef: any = useRef(null);
  const isLoading = useIsLoading("users");
  const trainers: ITrainer[] = useAppSelector(
    ({ trainers: { trainers } }: IStore) => trainers
  );
  useEffect(() => {
    if (trainers.length > 0) return;
    dispatch(initTrainers());
  }, []);

  const EditButtonCell = ({ rowData, dataKey, ...props }: any) => (
    <Table.Cell {...props}>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Edit />}
            onClick={() => {
              setTrainerData(filterTrainer(rowData._id, trainers));
              setIsOpen(true);
            }}
            color="orange"
            appearance="default"
            size="xs"
          >
            Edit Trainer
          </IconButton>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Trash />}
            onClick={() => {
              handleDelete(rowData._id);
            }}
            color="red"
            appearance="default"
            size="xs"
          >
            Delete Trainer
          </IconButton>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Table.Cell>
  );

  const handleSubmit = () => {
    if (!trainerFormRef.current.check()) return;
    if (Object.keys(trainerData).length <= 0) return;
    dispatch(editTrainerState({ trainerData }));
    setIsOpen(false);
    dispatch(initTrainers());
  };

  const handleDelete = (trainerId: string) => {
    dispatch(deleteTrainerState({ trainerId }));
    dispatch(initTrainers());
  };

  const PhotoCell = ({ rowData, dataKey, ...props }: CellProps) => {
    const tooltip = (
      <Tooltip placement="right">
        <img
          width={200}
          src={
            rowData.photo ? rowData.photo : "https://i.imgur.com/jHCmbB4.png"
          }
          alt="avatar"
        />
      </Tooltip>
    );

    return (
      <Table.Cell {...props}>
        <AvatarGroup>
          <Whisper
            placement="right"
            controlId="control-id-hover"
            trigger="hover"
            speaker={tooltip}
          >
            <Avatar
              src={
                rowData.photo
                  ? rowData.photo
                  : "https://i.imgur.com/jHCmbB4.png"
              }
              alt="trainer avatar"
            />
          </Whisper>
        </AvatarGroup>
      </Table.Cell>
    );
  };

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <h4>Trainers List</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Divider />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Table autoHeight rowHeight={60} data={trainers} loading={isLoading}>
            <Table.Column width={70} align="center">
              <Table.HeaderCell>Photo</Table.HeaderCell>
              <PhotoCell dataKey="photo" />
            </Table.Column>

            <Table.Column width={100}>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.Cell dataKey="firstName" />
            </Table.Column>

            <Table.Column width={100}>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.Cell dataKey="lastName" />
            </Table.Column>

            <Table.Column width={250}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <EditButtonCell dataKey="id" />
            </Table.Column>
          </Table>
          <EditTrainerForm
            ref={trainerFormRef}
            isOpen={isOpen}
            trainerForm={trainerData!}
            handleClose={() => setIsOpen(false)}
            onChange={(data) => setTrainerData(data)}
            handleSubmit={handleSubmit}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
