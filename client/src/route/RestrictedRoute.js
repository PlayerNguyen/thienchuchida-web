import React, { useEffect } from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import toastHelper from "../helpers/toastHelper";

function RestrictedRoute({ children, ...rest }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    if (!isSignedIn) {
      toastHelper.warn("Bạn phải đăng nhập để tiếp tục.");
    }
  }, [isSignedIn]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/dang-nhap",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default RestrictedRoute;
