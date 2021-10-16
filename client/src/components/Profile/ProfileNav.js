import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ProfileNav() {
  // const { path } = useRouteMatch();
  const [navItems] = useState([
    { path: "/thong-tin", text: "Thông tin" },
    { path: "/thong-tin/binh-luan", text: "Bình luận" },
  ]);
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-tabs">
      {navItems &&
        navItems.map((item, index) => {
          return (
            <li className="nav-item" key={index}>
              <Link
                className={`nav-link ${pathname === item.path && `active`}`}
                to={item.path}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
