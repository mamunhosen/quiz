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
      render={(props) =>
        isPrivate && !userDetails.isLoggedin ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default AppRoutes;
