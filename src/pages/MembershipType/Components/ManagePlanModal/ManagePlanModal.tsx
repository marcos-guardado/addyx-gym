//Libraries
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "rsuite";
//Redux
import {
  editMembershipType,
  initMembershipType,
  saveNewMembershipType,
} from "../../../../features/membershipsType/membersReducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
//Interfaces
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
//Utils
import { filterPlan } from "../../../../utils/filterMembershipPlan";
//Components
import { PlanForm } from "../PlanForm/PlanForm";
import { IStore } from "../../../../interfaces/store.interface";

interface IManagePlanModal {
  open: boolean;
  handleClose: () => void;
  planId?: string;
}

export default function ManagePlanModal({
  open,
  handleClose,
  planId,
}: IManagePlanModal) {
  const dispatch: any = useAppDispatch();
  const membershipsType: IMembershipType[] = useAppSelector(
    ({ membershipType: { membershipsType } }: IStore) => membershipsType
  );
  const isLoading: boolean = useAppSelector(
    ({ membershipType: { loading } }: IStore) => {
      return loading === "pending" ? true : false;
    }
  );
  const [planForm, setPlanForm] = useState<
    IMembershipType | Partial<IMembershipType>
  >({
    name: "",
    price: 0,
  });

  const formRef: any = useRef();

  useEffect(() => {
    if (planId) {
      setPlanForm(filterPlan(planId, membershipsType));
    }
  }, [planId]);

  const onChange = (formData: Partial<IMembershipType>): void => {
    setPlanForm(formData);
  };

  const onSubmit = async () => {
    if (!formRef.current?.check()) return;
    if (planId) {
      await dispatch(editMembershipType({ planId, plan: planForm }));
    } else {
      await dispatch(saveNewMembershipType(planForm));
    }
    dispatch(initMembershipType());
    handleClose();
    setPlanForm({
      name: "",
      price: 0,
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>{planId ? "Edit Plan" : "Create Plan"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlanForm planValue={planForm} onChange={onChange} ref={formRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          loading={isLoading}
          onClick={onSubmit}
          appearance="primary"
          disabled={isLoading}
        >
          Save
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
