import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { AppRouter } from "./components/AppRouter";
import { NavBar } from "./components/NavBar";
import { Context } from ".";
import { check } from "./http/userAPI";

import "bootstrap/dist/css/bootstrap.min.css";

const App = observer(() => {
  const { user } = useContext(Context);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      check();
      user.setIsAuth(true);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
