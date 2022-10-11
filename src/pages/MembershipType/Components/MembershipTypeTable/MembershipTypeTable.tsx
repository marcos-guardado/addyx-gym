//Libraries
import { useEffect, useState } from "react";
import { CellProps, Divider, FlexboxGrid, IconButton, Table } from "rsuite";
//Icons
import { Edit, Trash } from "@rsuite/icons";
//Redux
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
import {
  deleteMembershipTypeAPI,
  initMembershipType,
} from "../../../../features/membershipsType/membersReducer";
//Interfaces
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
//Components
import ManagePlanModal from "../ManagePlanModal/ManagePlanModal";
import { IStore } from "../../../../interfaces/store.interface";

export default function MembershipTypeTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [planId, setPlanId] = useState<string>();
  const dispatch = useAppDispatch();

  const isLoading: boolean = useAppSelector(
    ({ membershipType: { loading } }: IStore) =>
      loading === "pending" ? true : false
  );
  const membershipsType: IMembershipType[] = useAppSelector(
    ({ membershipType: { membershipsType } }: IStore) => membershipsType
  );

  useEffect(() => {
    if (membershipsType.length > 0) return;
    dispatch(initMembershipType());
  }, []);

  const PriceCell = ({ rowData, dataKey, ...props }: CellProps) => (
    <Table.Cell {...props}>
      <p>{rowData.price} MXN</p>
    </Table.Cell>
  );

  const EditButtonCell = ({ rowData, dataKey, ...props }: CellProps) => (
    <Table.Cell {...props}>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Edit />}
            onClick={() => {
              setPlanId(rowData._id);
              setOpen(true);
            }}
            color="orange"
            appearance="default"
            size="xs"
          >
            Edit Plan
          </IconButton>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
          <IconButton
            icon={<Trash />}
            onClick={() => {
              dispatch(deleteMembershipTypeAPI(rowData._id));
              dispatch(initMembershipType());
            }}
            color="red"
            appearance="default"
            size="xs"
          >
            Delete Plan
          </IconButton>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Table.Cell>
  );

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <h4>Membership Types List</h4>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Divider />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}>
          <Table data={membershipsType} autoHeight={true} loading={isLoading}>
            <Table.Column width={200}>
              <Table.HeaderCell>Plan Name</Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <PriceCell dataKey="price" />
            </Table.Column>

            <Table.Column width={200}>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <EditButtonCell dataKey="id" />
            </Table.Column>
          </Table>
          <ManagePlanModal
            planId={planId}
            open={open}
            handleClose={() => setOpen(false)}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
}
