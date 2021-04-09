import React from "react";
import {  Route, Redirect } from "react-router-dom";
import {  useSelector } from "react-redux";


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <Route {...rest} component={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
