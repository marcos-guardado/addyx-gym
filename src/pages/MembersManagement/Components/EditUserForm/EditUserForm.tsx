//Libraries
import React, { useEffect } from "react";
import {
  Button,
  Divider,
  FlexboxGrid,
  Form,
  Modal,
  Schema,
  SelectPicker,
} from "rsuite";
import FormControl from "rsuite/esm/FormControl";
//Redux
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
import { initMembershipType } from "../../../../features/membershipsType/membersReducer";
//Utils
import { useIsLoading } from "../../../../hooks/useIsLoading";
//Interfaces
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
import { IStore } from "../../../../interfaces/store.interface";
import { IUsers } from "../../../../interfaces/users.interface";

interface IEditUserForm {
  isOpen: boolean;
  userForm: Partial<IUsers>;
  handleClose: () => void;
  onChange: (value: Partial<IUsers>) => void;
  handleSubmit: () => void;
}

const planModel = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("The name is required"),
  lastName: Schema.Types.StringType().isRequired("The last name is required"),
  suscriptionType: Schema.Types.StringType().isRequired(
    "The suscription is required"
  ),
  start_date: Schema.Types.StringType().isRequired(
    "The start date is required"
  ),
  end_date: Schema.Types.StringType().isRequired("The end date is required"),
});

export const EditUserForm = React.forwardRef(
  (
    { isOpen, userForm, onChange, handleClose, handleSubmit }: IEditUserForm,
    ref: any
  ) => {
    const dispatch = useAppDispatch();
    const isLoading = useIsLoading("users");
    const currentDate = new Date().toISOString().split("T")[0];
    const nextValidDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDay()
    )
      .toISOString()
      .split("T")[0];
    const data: Array<{ label: string; value: string }> = useAppSelector(
      ({ membershipType: { membershipsType } }: IStore) =>
        membershipsType.map((item: IMembershipType) => ({
          label: item.name,
          value: item._id,
        }))
    );

    useEffect(() => {
      if (data.length > 0) return;
      dispatch(initMembershipType());
    }, []);

    return (
      <Modal open={isOpen} onClose={handleClose}>
        <Modal.Header>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Modal.Title>
                {userForm._id ? "Edit User" : "Create User"}
              </Modal.Title>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider></Divider>
        </Modal.Header>
        <Modal.Body>
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item>
              <Form
                formValue={userForm}
                onChange={onChange}
                model={planModel}
                ref={ref}
              >
                <Form.Group controlId="firstName">
                  <Form.ControlLabel>First Name</Form.ControlLabel>
                  <Form.Control errorPlacement="topStart" name="firstName" />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.ControlLabel>Last Name</Form.ControlLabel>
                  <Form.Control errorPlacement="topStart" name="lastName" />
                </Form.Group>
                <Form.Group controlId="suscriptionType">
                  <Form.ControlLabel>Suscription Type</Form.ControlLabel>
                  <Form.Control
                    errorPlacement="topStart"
                    name="suscriptionType"
                    data={data}
                    accepter={SelectPicker}
                  />
                </Form.Group>
                {!userForm._id && (
                  <>
                    <Form.Group controlId="start_date">
                      <Form.ControlLabel>Start Day</Form.ControlLabel>
                      <FormControl
                        errorPlacement="topStart"
                        type="date"
                        name="start_date"
                        min={currentDate}
                      ></FormControl>
                    </Form.Group>
                    <Form.Group controlId="end_date">
                      <Form.ControlLabel>End Day</Form.ControlLabel>
                      <FormControl
                        errorPlacement="topStart"
                        type="date"
                        name="end_date"
                        min={nextValidDate}
                      ></FormControl>
                    </Form.Group>
                  </>
                )}
              </Form>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
            appearance="primary"
            type="submit"
            color="green"
          >
            {userForm._id ? "Save" : "Pay and Suscribe"}
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleClose}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
);
