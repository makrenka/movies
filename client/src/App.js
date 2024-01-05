import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { AppRouter } from "./components/AppRouter";
import { NavBar } from "./components/NavBar";
import { Context } from ".";

import "bootstrap/dist/css/bootstrap.min.css";

const App = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      user.setIsAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
