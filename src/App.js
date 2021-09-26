import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login, logout } from "./reducers/userSlice";
import server from "./services/server";

function App() {
  const dispatcher = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      try {
        const decoded = jwtDecode(localStorage.getItem("token"));
        if (decoded) {
          if (Date.now() < decoded.exp * 1000) {
            server(true)
              .get("/user/" + decoded.userData._id)
              .then((result) => {
                if (!result.data.success) {
                  dispatcher(logout());
                } else {
                  console.log(result.data.load);
                  dispatcher(login(result.data.load));
                }
              });
          } else {
            console.log("as");

            dispatcher(logout());
          }
        }
      } catch (error) {
        dispatcher(logout());
      }
    }
  }, [dispatcher]);
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact>
            <Home />
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact>404</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
