import React, { useState, useEffect } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "../../app/slices/auth";
import toastHelper from "../../helpers/toastHelper";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
} from "react-bootstrap";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isValid, setIsValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // Prevent a submit form action
    e.preventDefault();

    // Empty field means no sign in
    if (username === "" || password === "") {
      return toastHelper.error("Vui lòng nhập đủ các trường thông tin");
    }

    setSubmitting(true);

    // Sign in
    UserService.postSignIn({ username, password })
      .then(({ data }) => {
        // If success sign in
        // setResponseData()
        toastHelper.success(data.message);
        // Navigate to home

        // Store credential and navigate to home
        dispatch(setSignedIn(true));
        dispatch(setPersistUser(data.data));
        // Navigate
        history.push("/");
      })
      .finally(() => {
        setPassword("");
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        <Container className="w-25 w-scalable  bg-white mt-3 mb-3 p-4 rounded">
          <Row className="mb-3">
            <Col>
              <h1 className="ff-normal">Đăng nhập</h1>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FloatingLabel
                controlId="username"
                label="Tên tài khoản / Email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="tên tài khoản hoặc email"
                  name="username"
                  value={username}
                  onChange={(_) => setUsername(_.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group>
              <FloatingLabel
                controlId="password"
                label="Mật khẩu"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="mật khẩu"
                  name="username"
                  value={password}
                  onChange={(_) => setPassword(_.target.value)}
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-secondary">
              <span>
                <Link to="/" className="text-secondary">
                  Bạn đã quên mật khẩu?
                </Link>
              </span>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 mb-3"
              size="md"
              disabled={submitting}
            >
              {submitting ? `Đang đăng nhập...` : `Đăng nhập`}
            </Button>

            <Form.Group>
              <Form.Label className="text-secondary">
                Bạn là người mới?
              </Form.Label>
              <Button
                variant="outline-success"
                onClick={(_) => {
                  history.push("/dang-ky");
                }}
                className="w-100"
                size="md"
              >
                Đăng ký
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Container>
    </div>
  );
}
