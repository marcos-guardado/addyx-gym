//Libraries
import { CSSProperties, useState } from "react";
import { Button, Drawer, FlexboxGrid, Nav, Navbar } from "rsuite";
import { Dashboard, Member, Peoples, Review, Menu } from "@rsuite/icons";
import { Link, useLocation } from "react-router-dom";
//Styles
import "./CustomNav.css";
//Utils
import useWindowDimensions from "../../hooks/useWindowsDimensions";

const menuOptions = [
  {
    name: "Dashboard",
    to: "/",
    Icon: ({ style }: { style: CSSProperties }) => <Dashboard style={style} />,
  },
  {
    name: "Membership Type",
    to: "/membership-type",
    Icon: ({ style }: { style: CSSProperties }) => <Member style={style} />,
  },
  {
    name: "Members Management",
    to: "/members-management",
    Icon: ({ style }: { style: CSSProperties }) => <Review style={style} />,
  },
  {
    name: "Trainers",
    to: "/trainers-management",
    Icon: ({ style }: { style: CSSProperties }) => <Peoples style={style} />,
  },
];

export default function CustomNav() {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      <Navbar>
        {width > 750 && <Navbar.Brand>MJD's GYM</Navbar.Brand>}
        <Nav appearance="subtle">
          {width <= 750 ? (
            <Nav.Item as="div">
              <Button onClick={() => setOpen(true)}>
                <Menu />
              </Button>
            </Nav.Item>
          ) : (
            <>
              {menuOptions.map(({ name, to, Icon }) => (
                <Nav.Item
                  as="div"
                  key={name}
                  icon={<Icon style={styleForNav} />}
                  active={to === location.pathname ? true : false}
                >
                  <Link key={name} to={to}>
                    {name}
                  </Link>
                </Nav.Item>
              ))}
            </>
          )}
        </Nav>
      </Navbar>

      <Drawer
        size="xs"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>MJD's GYM</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <FlexboxGrid>
            {menuOptions.map(({ name, to, Icon }) => (
              <FlexboxGrid.Item colspan={24} key={name} className="drawer-item">
                <Icon style={styleForDrawer} />{" "}
                <Link onClick={() => setOpen(false)} to={to}>
                  {name}
                </Link>
              </FlexboxGrid.Item>
            ))}
          </FlexboxGrid>
        </Drawer.Body>
      </Drawer>
    </>
  );
}

const styleForDrawer: CSSProperties = {
  textDecoration: "none",
  fontSize: "30px",
  marginRight: "10px",
};
const styleForNav: CSSProperties = {
  textDecoration: "none",
  fontSize: "25px",
  marginRight: "10px",
};
