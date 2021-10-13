import React from "react";
import { useRouteMatch } from "react-router";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import AdminRestrictedRoute from "../../route/AdminRestrictedRoute";
import AccountManagement from "./AccountManagement";
import { Row, Col, Container } from "react-bootstrap";
import AdminAside from "./AdminSidebar/AdminSidebar";
import ResourceManager from "./ResourceManager/ResourceManager";
import BookManager from "./BookManager/BookManager";
import AdminNavbar from "./AdminNavbar";
import "./style.scss";
import GeneralManager from "./GeneralManager/GeneralManager";
import NotifyManager from "./NotifyManager/NotifyManager";
import ConfessionManager from "./ConfessionManager/ConfessionManager";

export default function Admin() {
  const { path } = useRouteMatch();

  return (
    <Container fluid={"sm"} className="admin__wrapper pt-xl-5">
      <Row sm={12} className="admin__header mb-0 bg-dark">
        <AdminNavbar />
      </Row>

      <Row sm={12} className="admin__container bg-light d-flex">
        {/* Aside render here, navigate follows a below link */}
        <Col md={2} sm={12}>
          <AdminAside />
        </Col>

        {/* A container to contain */}
        <Col
          md={10}
          sm={12}
        >
          <Switch>

          <AdminRestrictedRoute path={`${path}/quan-ly-confession`}>
              <ConfessionManager />
            </AdminRestrictedRoute>

           <AdminRestrictedRoute path={`${path}/quan-ly-bang-tin`}>
              <NotifyManager />
            </AdminRestrictedRoute>
            
            <AdminRestrictedRoute path={`${path}/quan-ly-chung`}>
              <GeneralManager />
            </AdminRestrictedRoute>

            <AdminRestrictedRoute path={`${path}/quan-ly-truyen`}>
              <BookManager />
            </AdminRestrictedRoute>

            <AdminRestrictedRoute path={`${path}/quan-ly-tai-nguyen`}>
              <ResourceManager />
            </AdminRestrictedRoute>

            <AdminRestrictedRoute path={`${path}/quan-ly-tai-khoan`}>
              <AccountManagement />
            </AdminRestrictedRoute>

            <AdminRestrictedRoute path={`${path}/`}>
              <Container className="text-center p-5">
                <h1 className="fw-bold">Hãy chọn một mục để tiếp tục</h1>
              </Container>
            </AdminRestrictedRoute>

          </Switch>
        </Col>
        {/* <Row></Row> */}
      </Row>
    </Container>
  );
}
