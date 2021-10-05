import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import "../style.scss";
import "./AdminSidebar.scss";

export default function AdminAside() {
  const [activeMenu, setActiveMenu] = useState(null);

  const { pathname } = useLocation();
  const { path } = useRouteMatch();

  useEffect(() => {
    // Inspect effect here
    // const { pathname } = location;
    setActiveMenu(pathname.replace("/admin/", ""));
  }, [pathname]);
  const menu = [
    {
      path: "quan-ly-chung",
      title: "Chung",
    },
    {
      path: "quan-ly-tai-khoan",
      title: "Tài khoản",
    },
    {
      path: "quan-ly-truyen",
      title: "Truyện",
    },
    {
      path: "quan-ly-tai-nguyen",
      title: "Tài nguyên",
    },
    {
      path: "quan-ly-bang-tin",
      title: "Bảng tin",
    },
  ];

  // return (
  //   <div
  //   // className="admin__sidebar sidebar__wrapper d-flex flex-column flex-shrink-1 p-3 text-white bg-dark"
  //   className="d-flex bg-dark"
  //   >
  //     <div className="sidebar">
  //       <ul className="nav nav-pills flex-column mb-auto">
  //         {menu.map((_item) => (
  //           <li className="nav-item" key={_item.path}>
  //             <Link
  //               to={`${path}/${_item.path}`}
  //               className={`nav-link ${
  //                 activeMenu === _item.path ? "active" : ""
  //               }`}
  //             >
  //               {_item.title}
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );

  return (
    <Nav
      // variant="pills"
      defaultActiveKey={pathname}
      className="flex-md-column"
    >
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
    </Nav>
  );
}
