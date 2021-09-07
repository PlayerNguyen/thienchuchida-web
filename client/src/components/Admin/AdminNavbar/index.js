import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand admin__header__brand">Thiên Chu Chi Dạ</Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
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
