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
  faUserPlus
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
    <div className="dropdown-content" onClick={(e) => setIsOpen(!isOpen)}>
      <span>{title} </span>
      <span>
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      {isOpen ? (
        <div className="dropdown" ref={contentRef}>
          {items &&
            items.map((ele, index) => {
              return (
                <div key={index} className="dropdown__content">
                  <Link to={ele ? ele.url : ``} className="dropdown__link">
                    {ele ? (
                      <span className="dropdown__icon">
                        <FontAwesomeIcon icon={ele && ele.icon} />
                      </span>
                    ) : null}
                    {ele ? ele.text : ``}
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
            <Link to="/">Thiên Chu Chi Dạ</Link>
          </h1>
        </div>
        <div className="header-navigation">
          {isSignedIn ? (
            <NavDropdown
              title={persistUser && persistUser.username}
              items={[
                { url: `/thong-tin`, text: `Thông tin`, icon: faInfo },
                { url: `/dang-xuat`, text: `Đăng xuất`, icon: faSignOutAlt },
              ]}
            />
          ) : (
            <NavDropdown
              title={`Tài khoản`}
              items={[
                { url: `/dang-nhap`, text: `Đăng nhập`, icon: faSignInAlt },
                { url: `/dang-ky`, text: `Đăng ký`, icon: faUserPlus },
              ]}
            />
          )}
          <div>
            <Link to="/">Liên hệ</Link>
          </div>
          <div>
            <Link to="/">Thông tin</Link>
          </div>
          <div>
            <Link to="/">Trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
