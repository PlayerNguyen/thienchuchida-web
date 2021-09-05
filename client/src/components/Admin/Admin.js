import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AdminRestrictedRoute from "../../route/AdminRestrictedRoute";
import AccountManagement from "./AccountManagement";
import "./style.scss";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState(null);
  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    // Inspect effect here
    const { pathname } = location;
    setActiveMenu(pathname.replace("/admin/", ""));
  }, [location]);

  const menu = [
    {
      path: "quan-ly-tai-khoan",
      title: "Quản lý tài khoản",
    },
    {
      path: "quan-ly-truyen",
      title: "Quản lý truyện",
    },
  ];

  return (
    <div className="admin__wrapper">
      <div className="admin__container bg-white d-flex">
        <div
          style={{ width: 280 }}
          className="admin__sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        >
          {/* Aside render here, navigate follows a below link */}
          <ui className="nav nav-pills flex-column mb-auto">
            {menu.map((_item) => (
              <li className="nav-item" key={_item.path}>
                <Link
                  to={`${path}/${_item.path}`}
                  className={`nav-link ${activeMenu === _item.path ? "active" : ""}`}
                >
                  {_item.title}
                </Link>
              </li>
            ))}
          </ui>
        </div>
        <div className="admin__content w-100">
          <Switch>
            <AdminRestrictedRoute path={`${path}/quan-ly-tai-khoan`}>
              <AccountManagement />
            </AdminRestrictedRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
}
