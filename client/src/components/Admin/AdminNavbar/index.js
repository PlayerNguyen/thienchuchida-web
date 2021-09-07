import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand admin__header__brand" to="/">
          Thiên Chu Chi Dạ
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Trang chủ
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
