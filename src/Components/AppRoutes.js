import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useAuthState } from "../Context";

const AppRoutes = ({
  component: Component,
  path,
  isPrivate,
  onlyAdmin,
  ...rest
}) => {
  const userDetails = useAuthState();

  return (
    <Route
      path={path}
      render={(props) => {
        if (isPrivate) {
          if (!userDetails.user) {
            return <Redirect to={{ pathname: "/login" }} />;
          } else {
            if (onlyAdmin && !userDetails.user.isAdmin) {
              return <Redirect to={{ pathname: "/answers" }} />;
            } else {
              return <Component {...props} />;
            }
          }
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default AppRoutes;
