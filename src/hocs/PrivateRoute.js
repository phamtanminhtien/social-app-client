import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { userSelect } from "../reducers/userSlice";

function PrivateRoute(props) {
  const user = useSelector(userSelect);
  return <>{user ? <Route {...props} /> : <Redirect to="/login"></Redirect>}</>;
}

export default PrivateRoute;
