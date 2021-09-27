import React, { useContext, useEffect } from "react";
import { Navbar, NavbarText, Nav, Button } from "reactstrap";
import { useHistory } from "react-router";
import UserContext from "./userContext";
import { getUser } from "./api";
import { deleteAllCookies } from "./util/cookie";
import { User } from "./userContext";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (
      userContext?.user.firstName === "" ||
      userContext?.user.lastName === ""
    ) {
      getUser().then((userFromAPI: User) => {
        userContext?.setUser(userFromAPI);
      });
    }
  });

  const logout = () => {
    deleteAllCookies();
    history.push("/");
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Nav>
          <NavbarText className="p-2">{userContext?.user.firstName}</NavbarText>
          <NavbarText className="p-2">{userContext?.user.lastName}</NavbarText>
        </Nav>
        <Button onClick={logout} color="danger">
          Log Out
        </Button>
      </Navbar>
    </div>
  );
};

export default Dashboard;
