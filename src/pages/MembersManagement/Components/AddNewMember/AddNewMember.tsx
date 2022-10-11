//Libraries
import { useRef, useState } from "react";
import { FlexboxGrid, IconButton } from "rsuite";
//Icons
import { AddOutline } from "@rsuite/icons";
//Redux
import { useAppDispatch } from "../../../../app/hooks/hooks";
import {
  initUsersState,
  saveNewUserState,
} from "../../../../features/users/usersReducers";
//Interfaces
import { IUsers } from "../../../../interfaces/users.interface";
//Components
import { EditUserForm } from "../EditUserForm/EditUserForm";
//Styles
import "./AddNewMember.css";

export default function AddNewMember() {
  const dispatch = useAppDispatch();
  const usersFormRef: any = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userForm, setUserForm] = useState<Partial<IUsers>>({
    firstName: "",
    lastName: "",
    suscriptionType: "",
    start_date: "",
    end_date: "",
  });

  const onSubmit = () => {
    if (!usersFormRef.current.check()) return;
    if (Object.keys(userForm).length === 0) return;
    dispatch(saveNewUserState({ userData: userForm }));
    setIsOpen(false);
    setUserForm({
      firstName: "",
      lastName: "",
      suscriptionType: "",
      start_date: "",
      end_date: "",
    });
    dispatch(initUsersState());
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
          Suscribe User
        </IconButton>
      </FlexboxGrid.Item>
      <EditUserForm
        ref={usersFormRef}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        userForm={userForm}
        handleSubmit={onSubmit}
        onChange={(data) => setUserForm(data)}
      />
    </FlexboxGrid>
  );
}
