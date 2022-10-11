//Libraries
import { useEffect } from "react";
import { FlexboxGrid } from "rsuite";
//Redux
import { initMembershipType } from "../../../../features/membershipsType/membersReducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks/hooks";
//Interfaces
import { ICardInfo } from "../../../../interfaces/DashboardInterfaces/card-info.interface";
import { IMembershipType } from "../../../../interfaces/membershipType.interface";
import { IUsers } from "../../../../interfaces/users.interface";
//Components
import Card from "../Card/Card";
//Styles
import "./CardsInfo.css";
//Utils
import {
  calculateCurrentIncome,
  calculateJoinedThisMonth,
} from "../../../../utils/calculateCardData";
import { IStore } from "../../../../interfaces/store.interface";

const cardsInfo = (users: IUsers[], membershipType: IMembershipType[]) => {
  return [
    {
      id: "TM",
      name: "Total Members",
      qty: users.length || 0,
    },
    {
      id: "CI",
      name: "Current Income",
      qty: calculateCurrentIncome(users, membershipType),
    },
    {
      id: "JTM",
      name: "Joined this month",
      qty: calculateJoinedThisMonth(users),
    },
  ];
};

export default function CardsInfo() {
  const dispatch = useAppDispatch();
  const users: IUsers[] = useAppSelector(
    ({ users: { users } }: IStore) => users
  );
  const membershipType: IMembershipType[] = useAppSelector(
    ({ membershipType: { membershipsType } }: IStore) => membershipsType
  );

  useEffect(() => {
    if (membershipType.length > 0) return;
    dispatch(initMembershipType());
  }, []);

  return (
    <FlexboxGrid align="middle" as="div" justify="center">
      {cardsInfo(users, membershipType).map((card: ICardInfo) => (
        <FlexboxGrid.Item
          key={card.id}
          colspan={cardsInfo.length / 24}
          className="card-info"
        >
          <Card key={card.id} cardItem={card} />
        </FlexboxGrid.Item>
      ))}
    </FlexboxGrid>
  );
}
