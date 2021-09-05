import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faInfo,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function useOutsideDropdown(ref, setOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOpen]);
}

function NavDropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useOutsideDropdown(contentRef, setIsOpen);

  return (
    <div className="dropdown__outer" onClick={() => setIsOpen(!isOpen)}>
      <div className="dropdown__render">
        <span>{title}</span>
        <span className="icon">
          <FontAwesomeIcon icon={faCaretDown} />
        </span>
      </div>
      {isOpen ? (
        <div className="dropdown" ref={contentRef}>
          {items &&
            items.map((ele, index) => {
              return (
                <div key={index} className="">
                  <Link
                    to={ele ? ele.url : ``}
                    className=" dropdown__content dropdown__link"
                  >
                    {ele ? (
                      <span className="dropdown__icon">
                        <FontAwesomeIcon icon={ele && ele.icon} />
                      </span>
                    ) : null}
                    <span>{ele ? ele.text : ``}</span>
                    <span className="dropdown__icon"></span>
                  </Link>
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export default function Header() {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const persistUser = useSelector((state) => state.auth.persistUser);

  return (
    <div className="header__wrapper">
      <div className="header__container">
        <div className="header-logo-section">
          <h1>
            <Link to="/" className="link">
              Thiên Chu Chi Dạ
            </Link>
          </h1>
        </div>
        <div className="header-navigation">
          {isSignedIn ? (
            <NavDropdown
              title={persistUser && persistUser.username}
              items={[
                persistUser &&
                  persistUser.admin && {
                    url: `/admin`,
                    text: `Quản trị`,
                    icon: faInfo,
                  },
                { url: `/thong-tin`, text: `Thông tin`, icon: faInfo },
                { url: `/dang-xuat`, text: `Đăng xuất`, icon: faSignOutAlt },
              ]}
            />
          ) : (
            <NavDropdown
              title={`Account`}
              items={[
                { url: `/dang-nhap`, text: `Sign in`, icon: faSignInAlt },
                { url: `/dang-ky`, text: `Sign up`, icon: faUserPlus },
              ]}
            />
          )}
          <NavDropdown
            title={`Services`}
            items={[
              { url: `/`, text: `Donate` },
              { url: `/`, text: `Raw purchase` },
            ]}
          />
          <div>
            <Link to="/">Password</Link>
          </div>
          <NavDropdown
            title={`ManhWa`}
            items={[
              { url: `/`, text: `On-going` },
              { url: `/`, text: `Hoàn` },
              { url: `/`, text: `Drop` },
            ]}
          />
          <NavDropdown
            title={`Info`}
            items={[
              { url: `/`, text: `Confession` },
              { url: `/`, text: `About` },
            ]}
          />
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
