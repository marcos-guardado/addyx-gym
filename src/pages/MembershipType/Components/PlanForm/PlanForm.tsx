//Libraries
import React from "react";
import { Form, Schema } from "rsuite";
//Interfaces
import { IMembershipType } from "../../../../interfaces/membershipType.interface";

const planModel = Schema.Model({
  name: Schema.Types.StringType().isRequired("The name is required"),
  price: Schema.Types.NumberType().isRequired("Price is required"),
});

interface IPlanForm {
  planValue: Partial<IMembershipType>;
  onChange: (planData: Record<string, Partial<IMembershipType>>) => void;
}

function TextField(props: any) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control
        placeholder={label}
        autoComplete="off"
        errorPlacement="topStart"
        name={name}
        accepter={accepter}
        {...rest}
      />
    </Form.Group>
  );
}

export const PlanForm = React.forwardRef(
  ({ planValue, onChange }: IPlanForm, ref: any) => {
    return (
      <Form
        ref={ref}
        fluid
        onChange={onChange}
        formValue={planValue}
        model={planModel}
      >
        <TextField name="name" label="Plan Name" />
        <TextField type="number" name="price" label="Plan Price" />
      </Form>
    );
  }
);
