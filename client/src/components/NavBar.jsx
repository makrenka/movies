import { useContext } from "react";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Context } from "..";
import { MOVIES_ROUTE } from "../utils/route-consts";
import { observer } from "mobx-react-lite";

export const NavBar = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={MOVIES_ROUTE}>
          Online-movies
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "white" }}>
            <Button variant="outline-light">Admin</Button>
            <Button variant="outline-light" className="ms-2">
              Sign out
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={() => user.setIsAuth(true)}
            >
              Sign in
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
