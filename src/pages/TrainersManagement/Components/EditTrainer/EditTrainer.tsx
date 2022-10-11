//Libraries
import React from "react";
import { Button, Divider, FlexboxGrid, Form, Modal, Schema } from "rsuite";
//Utils
import { useIsLoading } from "../../../../hooks/useIsLoading";
//Interfaces
import { ITrainer } from "../../../../interfaces/trainers.interface";

interface IEditTrainerForm {
  isOpen: boolean;
  trainerForm: Partial<ITrainer>;
  handleClose: () => void;
  onChange: (value: Partial<ITrainer>) => void;
  handleSubmit: () => void;
}

const trainerModel = Schema.Model({
  firstName: Schema.Types.StringType()
    .isRequired("The name is required")
    .minLength(3, "The name must has 3 characters at least"),
  lastName: Schema.Types.StringType()
    .isRequired("The last name is required")
    .minLength(3, "The last name must has 3 characters at least"),
});

export const EditTrainerForm = React.forwardRef(
  (
    {
      isOpen,
      trainerForm,
      onChange,
      handleClose,
      handleSubmit,
    }: IEditTrainerForm,
    ref: any
  ) => {
    const isLoading: boolean = useIsLoading("users");
    return (
      <Modal open={isOpen} onClose={handleClose}>
        <Modal.Header>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              <Modal.Title>
                {trainerForm._id ? "Edit Trainer" : "Create Trainer"}
              </Modal.Title>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <Divider></Divider>
        </Modal.Header>
        <Modal.Body>
          <FlexboxGrid justify="center" align="middle">
            <FlexboxGrid.Item>
              <Form
                formValue={trainerForm}
                onChange={onChange}
                ref={ref}
                model={trainerModel}
              >
                <Form.Group controlId="firstName">
                  <Form.ControlLabel>First Name</Form.ControlLabel>
                  <Form.Control errorPlacement="topStart" name="firstName" />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.ControlLabel>Last Name</Form.ControlLabel>
                  <Form.Control errorPlacement="topStart" name="lastName" />
                </Form.Group>
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
            Save
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
