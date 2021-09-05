import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { login } from "./reducers/userSlice";

function App() {
  const dispatcher = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatcher(login(localStorage.getItem("token")));
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
