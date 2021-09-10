import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AdminRestrictedRoute from "../../route/AdminRestrictedRoute";
import AccountManagement from "./AccountManagement";
import "./style.scss";
import { Row, Col } from "react-bootstrap";
import AdminAside from "./AdminSidebar/AdminSidebar";
import ResourceManager from "./ResourceManager/ResourceManager";
import BookManager from "./BookManager/BookManager";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState(null);
  const { path } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    // Inspect effect here
    const { pathname } = location;
    setActiveMenu(pathname.replace("/admin/", ""));
  }, [location]);

  return (
    <div className="admin__wrapper">
      <Col className="admin__header mb-0 bg-dark">
        <div className="">
          <Link to="/">Trở về trang chủ</Link>
        </div>
      </Col>
      <Col className="admin__container bg-light d-flex">
        {/* Aside render here, navigate follows a below link */}
        <AdminAside />

        {/* A container to contain */}
        <Row className="admin__content">
          <Switch>
            <AdminRestrictedRoute path={`${path}/quan-ly-truyen`}>
              <BookManager />
            </AdminRestrictedRoute>
            <AdminRestrictedRoute path={`${path}/quan-ly-tai-nguyen`}>
              <ResourceManager />
            </AdminRestrictedRoute>
            <AdminRestrictedRoute path={`${path}/quan-ly-tai-khoan`}>
              <AccountManagement />
            </AdminRestrictedRoute>
          </Switch>
        </Row>
      </Col>
    </div>
  );
}
