import React, { useState } from "react";
import Header from "./../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import ProfileSetting from './ProfileSetting'

export default function Profile() {
  const persistUser = useSelector((state) => state.auth.persistUser);
  const { path } = useRouteMatch();
  const [navItems] = useState([{ name: "Thông tin", url: "/thong-tin" }]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container fluid className="profile-container">
        <Container className="w-50 bg-white p-4 mt-5 mb-5">
          <Row>
            <Col>
              <h1>{persistUser && persistUser.display}</h1>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <h4>Sub-title</h4>
            </Col>
          </Row>
          <Row>
            <ul class="nav nav-tabs">
              {navItems.map((item, i) => (
                <li class="nav-item" key={i}>
                  <Link className={`nav-link ${path === item.url ? 'active' : ''}`} to={item.url}>
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
