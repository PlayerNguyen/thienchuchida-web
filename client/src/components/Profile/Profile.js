import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.scss";
import ProfileNav from "./ProfileNav";
import { useRouteMatch } from "react-router-dom";
import ProfileSetting from "./ProfileSetting";

export default function Profile() {
  const persistUser = useSelector((state) => state.auth.persistUser);
  // const {pathname} = useLocation();
  const { path } = useRouteMatch();

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container fluid className="mb-3">
        <div className="profile__container">
          <Row className="mb-3">
            <Col>
              <h1>{persistUser && persistUser.display}</h1>
              <h3 className="text-secondary">
                {persistUser && persistUser.username}
              </h3>
            </Col>
          </Row>
          <Row>
            <ProfileNav />
          </Row>
          <Row>
            <Switch>
              <Route path={`${path}/binh-luan`}>Chào</Route>
              <Route path={`${path}/`}>
                <ProfileSetting persistUser={persistUser} />
              </Route>
            </Switch>
          </Row>
        </div>
      </Container>
    </div>
  );
}
