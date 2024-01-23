import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Context } from "..";
import {
  ADMIN_ROUTE,
  LIST_PAGE_ROUTE,
  LOGIN_ROUTE,
  MOVIES_ROUTE,
} from "../utils/route-consts";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(MOVIES_ROUTE);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={MOVIES_ROUTE}>
          Online-cinema
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "white", alignItems: "center" }}>
            <p style={{ color: "white", marginBottom: 0, marginRight: "20px" }}>
              Hello, {token && decodedToken.email.split("@")[0]}
            </p>
            {location.pathname.includes("list") ? null : (
              <Button
                variant="outline-light"
                onClick={() => navigate(LIST_PAGE_ROUTE)}
              >
                Your list
              </Button>
            )}
            {decodedToken.role === "ADMIN" ? (
              <Button
                variant="outline-light"
                onClick={() => navigate(ADMIN_ROUTE)}
                className="ms-2"
              >
                Admin
              </Button>
            ) : null}
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
