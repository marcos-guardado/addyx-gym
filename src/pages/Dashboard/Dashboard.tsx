import { Col, FlexboxGrid } from "rsuite";
import CardsInfo from "./Components/CardsInfo/CardsInfo";
import UsersTable from "./Components/UsersTable/UsersTable";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <FlexboxGrid align="middle" justify="center">
      <FlexboxGrid.Item colspan={24} as={Col} md={24} sm={24}>
        <div className="image-bg" />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24} as={Col} md={24} sm={24}>
        <CardsInfo />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24} as={Col} md={24} sm={24}>
        <UsersTable />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
