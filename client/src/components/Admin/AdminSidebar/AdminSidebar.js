import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import "../style.scss";
import "./AdminSidebar.scss";

export default function AdminAside() {
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
    {
      path: "quan-ly-tai-nguyen",
      title: "Quản lý tài nguyên",
    },
  ];

  return (
    <div className="admin__sidebar sidebar__wrapper d-flex flex-column flex-shrink-1 p-3 text-white bg-dark" >
      <div className="sidebar">
        <ul className="nav nav-pills flex-column mb-auto">
          {menu.map((_item) => (
            <li className="nav-item" key={_item.path}>
              <Link
                to={`${path}/${_item.path}`}
                className={`nav-link ${
                  activeMenu === _item.path ? "active" : ""
                }`}
              >
                {_item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
