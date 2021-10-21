import React, { useEffect, useState } from "react";
import { TabContainer, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import UserService from "../../services/UserService";
import toastHelper from "../../helpers/toastHelper";

export default function ProfileSetting() {
  const persistUser = useSelector((selector) => selector.auth.persistUser);

  const [profileModify, setProfileModify] = useState(false);
  const [username, setUsername] = useState("");
  const [display, setDisplay] = useState("");
  const [email, setEmail] = useState("");
  const [changingInformation, setChangingInformation] = useState(false);

  // const [currentPassword, setCurrentPassword] = useState("");
  // const [passwordModify, setPasswordModify] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (persistUser) {
      UserService.getGeneralProfile(persistUser._id).then((response) => {
        const { data } = response.data;
        setUsername(data.username);
        setDisplay(data.display);
        setEmail(data.email);
      });
    }
  }, [persistUser]);

  const handleSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    setChangingInformation(true);
    // Put the user profile in the database
    UserService.putAdminModifyUser({
      _id: persistUser._id,
      username,
      display,
      email,
    })
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
        setProfileModify(false);
      })
      .finally((_) => {
        setChangingInformation(false);
      });
  };

  const handleSubmitChangePassword = (e) => {
    // Prevent form submission
    e.preventDefault();
    // Validate the new password
    if (newPassword !== renewPassword) {
      toastHelper.error("Mật khẩu bạn đã nhập lại không hợp lệ.");
      return;
    }
    // Set changing status
    setChangingPassword(true);
    // Change password
    UserService.putAdminModifyUser({
      _id: persistUser._id,
      password: newPassword,
    })
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
      })
      .finally((_) => {
        setRenewPassword("");
        setNewPassword("");
        setChangingPassword(false)
      });
  };

  return (
    <TabContainer>
      <Row>
        <Col>
          <h3 className="mt-3 ff-normal">Tài khoản</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-secondary">Chỉnh sửa thông tin tài khoản</p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Tài khoản
          </Form.Label>
          <Col md={10}>
            <Form.Control type="text" value={username} disabled />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Tên hiển thị
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="text"
              value={display}
              onChange={(_) => {
                setProfileModify(true);
                setDisplay(_.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Email
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="email"
              value={email}
              onChange={(_) => {
                setProfileModify(true);
                setEmail(_.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Row>
          <Col md={2}></Col>
          <Col>
            <Button
              type="submit"
              disabled={changingInformation || !profileModify}
            >
              {changingInformation ? `Đang thay đổi...` : `Thay đổi`}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Password section */}
      <Row>
        <Col>
          <h3 className="mt-3 ff-normal">Đổi mật khẩu</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="text-secondary">Thay đổi mật khẩu</p>
        </Col>
      </Row>
      <Form onSubmit={handleSubmitChangePassword}>
        {/* <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Mật khẩu cũ
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(_) => setCurrentPassword(_.target.value)}
            />
          </Col>
        </Form.Group> */}

        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Mật khẩu mới
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(_) => setNewPassword(_.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column md={2}>
            Nhập lại mật khẩu mới
          </Form.Label>
          <Col md={10}>
            <Form.Control
              type="password"
              name="password"
              value={renewPassword}
              onChange={(_) => {
                setRenewPassword(_.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Row>
          <Col md={2}></Col>
          <Col>
            <Button
              type="submit"
              disabled={
                changingPassword || (newPassword === "" && renewPassword === "")
              }
            >
              {changingPassword ? `Đang thay đổi...` : `Đổi mật khẩu`}
            </Button>
          </Col>
        </Row>
      </Form>
    </TabContainer>
  );
}
