//Libraries
import { useEffect, useState } from "react";
import { CellProps, Divider, FlexboxGrid, IconButton, Table } from "rsuite";
import { Edit, Trash } from "@rsuite/icons";
//Redux
import {
  deleteUsersState,
  editUsersState,
  initUsersState,
} from "../../../../features/users/usersReducers";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
//Interfaces
import { IUsers } from "../../../../interfaces/users.interface";
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
//utils
import { useIsLoading } from "../../../../hooks/useIsLoading";
import { filterUser } from "../../../../utils/filterUser";
import { formatUsersToDataTable } from "../../../../utils/formatToTableData";
//Components
import { EditUserForm } from "../EditUserForm/EditUserForm";
import { IStore } from "../../../../interfaces/store.interface";

export default function UsersTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<Partial<IUsers>>({});
  const dispatch = useAppDispatch();
  const isLoading = useIsLoading("users");
  const users: IUsers[] = useAppSelector(
    ({ users: { users } }: IStore) => users
  );
  const plans: IMembershipType[] = useAppSelector(
    ({ membershipType: { membershipsType } }: IStore) => membershipsType
  );

  useEffect(() => {
    if (users.length > 0) return;
    dispatch(initUsersState());
  }, []);

  const EditButtonCell = ({ rowData, dataKey, ...props }: CellProps) => (
    <Table.Cell {...props}>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Edit />}
            onClick={() => {
              setUserData(filterUser(rowData._id, users));
              setIsOpen(true);
            }}
            color="orange"
            appearance="default"
            size="xs"
          >
            Edit User
          </IconButton>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Trash />}
            onClick={() => {
              handleDelete(rowData._id);
              dispatch(initUsersState())
            }}
            color="red"
            appearance="default"
            size="xs"
          >
            Delete User
          </IconButton>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Table.Cell>
  );

  const handleSubmit = () => {
    dispatch(editUsersState({ userData }));
    setIsOpen(false);
    dispatch(initUsersState());
  };

  const handleDelete = (userId: string) => {
    dispatch(deleteUsersState({ userId }));
    dispatch(initUsersState());
  };

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <h4>Users List</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Divider />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Table
            data={formatUsersToDataTable(users, plans)}
            autoHeight={true}
            loading={isLoading}
            rowHeight={60}
          >
            <Table.Column width={200}>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.Cell dataKey="firstName" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.Cell dataKey="lastName" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Suscription Type</Table.HeaderCell>
              <Table.Cell dataKey="suscriptionType" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.Cell dataKey="start_date" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.Cell dataKey="end_date" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              <EditButtonCell dataKey="id" />
            </Table.Column>
          </Table>
          <EditUserForm
            isOpen={isOpen}
            userForm={userData!}
            handleClose={() => setIsOpen(false)}
            onChange={(data) => setUserData(data)}
            handleSubmit={handleSubmit}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
