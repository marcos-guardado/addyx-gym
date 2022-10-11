//Libraries
import { useEffect } from "react";
import { CellProps, Divider, FlexboxGrid, Table } from "rsuite";
//Redux
import { initUsersState } from "../../../../features/users/usersReducers";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
//Interfaces
import { IUsers } from "../../../../interfaces/users.interface";
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
//Utils
import { validateIfPlanExists } from "../../../../utils/validateIfPlanExists";
import { formatUsersToDataTable } from "../../../../utils/formatToTableData";
import { IStore } from "../../../../interfaces/store.interface";

export default function UsersTable() {
  const dispatch = useAppDispatch();
  const users: IUsers[] = useAppSelector(({ users: { users } }:IStore) => users);
  const membershipsType: IMembershipType[] = useAppSelector(
    ({ membershipType: { membershipsType } }:IStore) => membershipsType
  );
  useEffect(() => {
    if (users.length > 0) return;
    dispatch(initUsersState());
  }, []);

  const SuscriptionTypeCell = ({ rowData, dataKey, ...props }: CellProps) => (
    <Table.Cell {...props}>
      <p>{validateIfPlanExists(rowData.suscriptionType, membershipsType)}</p>
    </Table.Cell>
  );

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
            data={formatUsersToDataTable(users, membershipsType)}
            autoHeight={true}
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
              <SuscriptionTypeCell dataKey="suscriptionType" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.Cell dataKey="start_date" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.Cell dataKey="end_date" />
            </Table.Column>
          </Table>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
