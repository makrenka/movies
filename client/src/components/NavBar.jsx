import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Context } from "..";
import { ADMIN_ROUTE, LOGIN_ROUTE, MOVIES_ROUTE } from "../utils/route-consts";
import { observer } from "mobx-react-lite";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={MOVIES_ROUTE}>
          Online-movies
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Admin
            </Button>
            <Button
              variant="outline-light"
              className="ms-2"
              onClick={() => logOut()}
            >
              Sign out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Sign in
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
