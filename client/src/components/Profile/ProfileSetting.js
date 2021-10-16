import React, { useEffect, useState } from "react";
import { Row, Col, Container, FormControl, Button } from "react-bootstrap";
import UserService from "../../services/UserService";

export default function ProfileSetting({ persistUser }) {
  const [display, setDisplay] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  useEffect(() => {
    if (persistUser) {
      setDisplay(persistUser.display);
    }
  }, [persistUser]);

  const handleUpdate = () => {
    
  };

  return (
    <Container className="p-3 ">
      <Row className="mb-3 mt-3">
        <Col>
          <h3 className="ff-normal">Cài đặt chung</h3>
        </Col>
      </Row>
      {/* Display name */}
      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2">
              Tên hiển thị
            </Col>
            <Col>
              <FormControl
                placeholder="Tên hiển thị"
                value={display}
                onChange={(_) => setDisplay(_.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Email */}
      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2">
              Email
            </Col>
            <Col>
              <FormControl
                type="email"
                placeholder="Tên hiển thị"
                disabled
                value={persistUser.email}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-3 mt-3">
        <Col>
          <h3 className="ff-normal">Đổi mật khẩu</h3>
        </Col>
      </Row>
      {/* Current password */}
      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2">
              Mật khẩu hiện tại
            </Col>
            <Col>
              <FormControl
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={previousPassword}
                onChange={(_) => setPreviousPassword(_.target.value)}
                
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* New password */}
      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2">
              Mật khẩu mới
            </Col>
            <Col>
              <FormControl
                type="password"
                placeholder="Mật khẩu mới"
                value={password}
                onChange={(_) => setPassword(_.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2">
              Nhập lại mật khẩu mới
            </Col>
            <Col>
              <FormControl
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                value={rePassword}
                onChange={(_) => setRePassword(_.target.value)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={1}></Col>
        <Col>
          <Row className="mb-sm-3">
            <Col md={2} sm={12} className="text-secondary mb-2"></Col>
            <Col>
              <Button>Thay đổi</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
