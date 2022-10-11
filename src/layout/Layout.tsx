//Libraries
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Container, Content, Header } from "rsuite";
//Styles
import "./Layout.css";
import "react-toastify/dist/ReactToastify.css";
//Components
import CustomNav from "../Shared/Nav/CustomNav";
import Dashboard from "../pages/Dashboard/Dashboard";
import MembershipType from "../pages/MembershipType/MembershipType";
import MembersManagement from "../pages/MembersManagement/MembersManagement";
import TrainersManagement from "../pages/TrainersManagement/TrainersManagement";
import Login from "../pages/Login/Login";

export default function Layout() {
  return (
    <Container>
      <Header>
        <CustomNav />
      </Header>
      <Content className="layout-container">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/membership-type" element={<MembershipType />} />
          <Route path="/members-management" element={<MembersManagement />} />
          <Route path="/trainers-management" element={<TrainersManagement />} />
        </Routes>
        <ToastContainer />
      </Content>
    </Container>
  );
}
