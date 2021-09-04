import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

/**
 * Admin access page, if user is not an admin, kick 'em out.
 * 
 * @returns route components
 */
 function AdminRestrictedRoute({ children, ...rest }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const persistUser = useSelector((state) => state.auth.persistUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isSignedIn && persistUser && persistUser.admin ? (
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

export default AdminRestrictedRoute;