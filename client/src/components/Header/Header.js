import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  const handleDropdownMoveEnter = (e) => {
    const parent = e.target.parentElement;
    const dropdown = parent.querySelector(".dropdown");
    if (dropdown != null) dropdown.style.display = "block";
  };

  const handleDropdownMoveLeave = (e) => {
    const parent = e.target.parentElement;
    const dropdown = parent.querySelector(".dropdown");
    if (dropdown != null) dropdown.style.display = "none";
  };

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <div className="header-logo-section">
          <h1>Tên của trang</h1>
        </div>
        <div className="header-navigation">
          <div>
            <Link to="/">Accounts</Link>
          </div>
          <div>
            <Link to="/">Contacts</Link>
          </div>
          <div>
            <Link to="/">About</Link>
          </div>
          <div
            onMouseEnter={handleDropdownMoveEnter}
            onMouseLeave={handleDropdownMoveLeave}
            className="dropdown-content"
          >
            <Link to="/">Home</Link>
            <div className="dropdown">
              <Link to="/">A</Link>
              <Link to="/">B</Link>
              <Link to="/">c</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
