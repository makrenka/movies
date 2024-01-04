import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Spinner from "react-bootstrap/Spinner";

import { AppRouter } from "./components/AppRouter";
import { NavBar } from "./components/NavBar";
import { Context } from ".";
import { check } from "./http/userAPI";

import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check()
    //   .then((data) => {
    //     user.setUser(data);
    //     user.setIsAuth(true);
    //     console.log(data);
    //   })
    //   .finally(() => setLoading(false));
    const token = Cookies.get("token");
    const userStorage = localStorage.getItem("user");
    if (token && userStorage && user.isAuth) {
      user.setIsAuth(true);
      setLoading(false);
    }
  }, []);

  // if (loading) {
  //   return <Spinner animation="grow" />;
  // }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
