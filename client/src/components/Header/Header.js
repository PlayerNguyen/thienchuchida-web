import React, { useState, useRef, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCaretLeft,
  faCaretDown,
  faInfo,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faTasks,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import useClickOutsideRef from "../../hooks/useClickOutsideRef";
import useWindowSize from "../../hooks/useWindowSize";
import MiscConfig from "../../config/misc.config";

function NavDropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const { width } = useWindowSize();

  /**
   * Toggle open or not
   */
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useClickOutsideRef(contentRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      className="dropdown__outer"
      onClick={toggleOpen}
      data-toggle="collapse"
      ref={contentRef}
    >
      <div className="dropdown__render">
        <span>{title}</span>
        <span className="icon">
          {width <= 768 ? (
            <>
              {isOpen ? (
                <FontAwesomeIcon icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon icon={faCaretLeft} />
              )}
            </>
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </span>
      </div>
      {isOpen ? (
        <div className="dropdown" >
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
                        <FontAwesomeIcon icon={ele.icon && ele.icon} />
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
  const [expand, setExpand] = useState(false);
  const { width } = useWindowSize();
  const expansionMenu = useRef(null);

  const [userInfoItems, setUserInfoItems] = useState([]);

  /**
   * Expand an aside left menu
   */
  const handleExpand = () => {
    setExpand(!expand);
  };

  /**
   * On click outside of the expansion menu
   */
  useClickOutsideRef(expansionMenu, setExpand);

  useEffect(() => {
    if (!isSignedIn) {
      setUserInfoItems([
        { url: `/dang-nhap`, text: `Sign in`, icon: faSignInAlt },
        { url: `/dang-ky`, text: `Sign up`, icon: faUserPlus },
      ]);
    } else {
      let arr = [
        { url: `/thong-tin`, text: `Thông tin`, icon: faInfo },
        { url: `/dang-xuat`, text: `Đăng xuất`, icon: faSignOutAlt },
      ];
      // Whether user is an admin
      if (persistUser && persistUser.admin) {
        arr = [
          {
            url: `/admin`,
            text: `Quản trị`,
            icon: faTasks,
          },
          ...arr,
        ];
      }
      setUserInfoItems(arr);
    }
  }, [persistUser, isSignedIn]);

  return (
    <div className="header__wrapper">
      <div className="header__container">
        {width <= 768 && (
          <div className="header__expand" onClick={handleExpand}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}
        <div className="header-logo-section">
          <h1>
            <Link to="/" className="link">
              Thiên Chu Chi Dạ
            </Link>
          </h1>
        </div>
        <div className="header__expand">
          {/* <FontAwesomeIcon icon={faBars} /> */}
        </div>
        {/* Using mobile or not */}
        {width <= MiscConfig.TABLET_SIZE ? (
          <>
            {expand && (
              <div className="header-navigation" ref={expansionMenu}>
                <div
                  onClick={handleExpand}
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  <span style={{ fontSize: 18 }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                  <span style={{ flex: 2 }}></span>
                </div>
                <div>
                  <Link to="/">Home</Link>
                </div>
                {isSignedIn ? (
                  <NavDropdown
                    title={
                      isSignedIn
                        ? persistUser && persistUser.display
                        : `Account`
                    }
                    items={userInfoItems}
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
              </div>
            )}
          </>
        ) : (
          <div className="header-navigation">
            <NavDropdown
              title={
                isSignedIn ? persistUser && persistUser.username : `Account`
              }
              items={userInfoItems}
            />
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
        )}
      </div>
    </div>
  );
}
