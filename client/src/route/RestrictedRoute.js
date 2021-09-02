import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function RestrictedRoute({ children, ...rest }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default RestrictedRoute;
