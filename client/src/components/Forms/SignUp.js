import React, { useState, useEffect } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MiscConfig from "../../config/misc.config";
import Header from "../Header/Header";
import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import validateHelper from "../../helpers/validateHelper";
import toastHelper from "../../helpers/toastHelper";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [display, setDisplay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isRepasswordValid, setIsRepasswordValid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isDisplayValid, setIsDisplayValid] = useState(true);
  const history = useHistory();
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // Prevent a submit form action
    e.preventDefault();

    // Empty field means no sign in
    if (!isValid) {
      return toastHelper.error(
        "Các thông tin bạn nhập bị thiếu hoặc chưa chính xác. Hãy thử lại."
      );
    }

    // Field validation: password must greater than configured value
    if (password.length < MiscConfig.PASSWORD_MINIMUM_LENGTH) {
      return toast.error(
        `Mật khẩu phải lớn hơn ${MiscConfig.PASSWORD_MINIMUM_LENGTH} chữ số.`
      );
    }

    // Sign in
    UserService.postSignUp({ username, password, email, display })
      .then(({ data }) => {
        // If success sign up
        // setResponseData();
        toast.success(data.message);
        history.push("/dang-nhap");
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally((e) => {
        // Empty critical info
        setPassword("");
        setRepassword("");
      });
  };

  useEffect(() => {
    if (password === "") {
      setPasswordValid(true);
    } else setPasswordValid(validateHelper.validatePassword(password));
  }, [password]);

  useEffect(() => {
    if (password === "" || repassword === "") {
      setIsRepasswordValid(true);
    } else setIsRepasswordValid(password === repassword);
  }, [password, repassword]);

  useEffect(() => {
    setIsValid(
      username !== "" &&
        email !== "" &&
        isPasswordValid &&
        isRepasswordValid &&
        display !== ""
    );
  }, [username, email, isPasswordValid, isRepasswordValid, display]);

  useEffect(() => {
    // if (display === "") {
    //   setIsDisplayValid(true);
    // } else setIsDisplayValid(validateHelper.validateDisplayName(display));
    setIsDisplayValid(display !== "");
  }, [display]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        <Container className=" w-25 w-scalable bg-white mt-3 mb-3 p-4 rounded">
          <Row className="mb-3">
            <Col>
              <h1 className="ff-normal">Đăng ký</h1>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="display" label="Tên hiển thị">
                <Form.Control
                  type="text"
                  placeholder="Tên hiển thị"
                  required
                  value={display}
                  onChange={({ target }) => setDisplay(target.value)}
                  isInvalid={!isDisplayValid}
                />
              </FloatingLabel>
              <Form.Text className="text-muted">
                Tên này dùng để hiển thị với mọi người
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="username" label="Tên người dùng">
                <Form.Control
                  type="text"
                  placeholder="Tên người dùng"
                  required
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </FloatingLabel>
              <Form.Text className="text-muted">
                Tên này dùng để đăng nhập
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="email" label="Email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel controlId="password" label="Mật khẩu">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  isInvalid={!isPasswordValid}
                />
              </FloatingLabel>

              <Form.Text className="text-muted">
                <strong>Mật khẩu phải có </strong>
                <br />
                <ul>
                  <li>Một ký tự viết thường</li>
                  <li>Một ký tự viết hoa</li>
                  <li>Một chữ số</li>
                  <li>Ít nhất 8 ký tự</li>
                </ul>
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="password"
                label="Nhập lại mật khẩu"
                isInvalid={!isRepasswordValid}
              >
                <Form.Control
                  type="password"
                  name="repassword"
                  placeholder="Nhập lại mật khẩu"
                  required
                  value={repassword}
                  onChange={({ target }) => setRepassword(target.value)}
                  isInvalid={!isRepasswordValid}
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              size={"md"}
              className="w-100 mb-3"
            >
              Đăng ký
            </Button>

            <Form.Group>
              <Form.Label className="text-secondary">
                Đã có tài khoản?
              </Form.Label>
              <Button
                onClick={() => {
                  history.push("/dang-nhap");
                }}
                variant="outline-success"
                size={"md"}
                className="w-100"
              >
                Đăng nhập
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </Container>
    </div>
  );
}
