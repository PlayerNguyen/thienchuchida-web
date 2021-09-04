import React, { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AdminRestrictedRoute from "../../route/AdminRestrictedRoute";
import AccountManagement from "./AccountManagement";

export default function Admin() {
  let { path, url } = useRouteMatch();


  useEffect(() => {
    // Inspect effect here
  }, []);

  return (
    <div className="admin__wrapper">
      <div>
        {/* Aside render here, navigate follows a below link */}
        <div>
          <li>
            <Link to={`${url}/rendering`}>Rendering with React</Link>
          </li>
        </div>
      </div>
      <div className="admin__content">
        <Switch>
          <AdminRestrictedRoute path={`${path}/quan-ly-tai-khoan`}>
            <AccountManagement />
          </AdminRestrictedRoute>
        </Switch>
      </div>
    </div>
  );
}
