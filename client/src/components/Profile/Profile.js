import React, { useState } from "react";
import Header from "./../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import ProfileSetting from "./ProfileSetting";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const persistUser = useSelector((state) => state.auth.persistUser);
  const { path } = useRouteMatch();
  const [navItems] = useState([{ name: "Thông tin", url: "/thong-tin" }]);

  return (
    <div>
      <Helmet>
        <title>{persistUser && persistUser.display}</title>
      </Helmet>
      <div>
        <Header />
      </div>
      <Container fluid className="profile-container">
        <Container className="bg-white p-4 mt-md-5 mb-md-5 mt-sm-2 mb-sm-2">
          <Row className="mb-3">
            <Col>
              <h1 className="ff-normal">
                {persistUser && persistUser.display}
              </h1>
            </Col>
          </Row>
          {/* <Row className="mb-2">
            <Col>
              <h4>Sub-title</h4>
            </Col>
          </Row> */}
          <Row>
            <ul class="nav nav-tabs">
              {navItems.map((item, i) => (
                <li class="nav-item" key={i}>
                  <Link
                    className={`nav-link ${path === item.url ? "active" : ""}`}
                    to={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Row>
          <Row>
            <Container>
              <Switch>
                <Route path="/">
                  <ProfileSetting />
                </Route>
              </Switch>
            </Container>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
