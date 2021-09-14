import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function ModifyUserModal({ visible, onConfirm, onClose, user = null, loading }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    admin: false,
    changingPassword: false,
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [validator, setValidator] = useState({
    passwordMatch: true,
  });
  // state of interacting with inputs
  const [inputState, setInputState] = useState({
    focusPassword: false,
  });

  useEffect(() => {
    if (user) {
      // override init state with existing properties
      setUserInfo({ ...userInfo, ...user });
    }
  }, [user, userInfo]);

  /**
   *
   * @returns {Boolean}
   */
  const handleCheckAllValidatorsValid = () => {
    let isInputValid = true;
    Object.entries(validator).forEach((_key, _value) => {
      if (!_value) {
        isInputValid = false;
      }
    });
    return isInputValid;
  };

  const handleConfirmModifyUser = () => {
    const isInputValid = handleCheckAllValidatorsValid();
    if (isInputValid) {
      onConfirm(userInfo);
    } else {
      toast.error("Dữ liệu không hợp lệ! Vui lòng kiểm tra lại.");
    }
  };

  /**
   *
   * @param {String} property
   */
  const handleChangeUserInfo = (property) => (e) => {
    const { value } = e.target;
    setUserInfo({ ...userInfo, [property]: value });
  };

  /**
   *
   * @param {HtmlEvent} e
   */
  const handleChangeUserRole = (e) => {
    const { checked } = e.target;
    setUserInfo({ ...userInfo, admin: checked });
  };

  const handleAllowChangePassword = () => {
    setUserInfo({
      ...userInfo,
      changingPassword: !userInfo.changingPassword,
      password: "",
      confirmPassword: "",
    });
  };

  /**
   *
   * @param {Boolean} focusState
   */
  const handleFocusOnPassword = (focusState) => {
    setInputState({ ...inputState, focusPassword: focusState });
    // lost focus
    if (!focusState) {
      const { password, confirmPassword } = userInfo;
      let passwordMatch = true;
      if ((password || confirmPassword) && password !== confirmPassword) {
        passwordMatch = false;
      }
      setValidator({
        ...validator,
        passwordMatch,
      });
    }
  };

  return (
    <>
      <Modal show={visible} onHide={onClose}>
        <Modal.Header closeButton>{user ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={userInfo.username}
                name="username"
                placeholder="Nhập tên đăng nhập"
                onChange={handleChangeUserInfo("username")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={userInfo.email}
                name="email"
                type="email"
                placeholder="Nhập email"
                onChange={handleChangeUserInfo("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                checked={userInfo.admin}
                name="admin"
                type="checkbox"
                label="Quản trị viên"
                onChange={handleChangeUserRole}
              />
            </Form.Group>
            {user && (
              <Form.Group className="mb-3">
                <Button variant="link" onClick={handleAllowChangePassword}>
                  Đổi mật khẩu
                </Button>
              </Form.Group>
            )}
            {(!user || userInfo.changingPassword) && (
              <>
                {userInfo.changingPassword && (
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                      value={userInfo.currentPassword}
                      name="currentPassword"
                      type="password"
                      onChange={handleChangeUserInfo("currentPassword")}
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu {userInfo.changingPassword && "mới"}</Form.Label>
                  <Form.Control
                    value={userInfo.password}
                    name="password"
                    type="password"
                    onFocus={() => handleFocusOnPassword(true)}
                    onBlur={() => handleFocusOnPassword(false)}
                    onChange={handleChangeUserInfo("password")}
                  />
                  {!inputState.focusPassword &&
                    !validator.passwordMatch &&
                    (userInfo.password || userInfo.confirmPassword) && (
                      <Form.Text className="text-bold text-danger">
                        Mật khẩu không trùng khớp!
                      </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    value={userInfo.confirmPassword}
                    name="confirmPassword"
                    type="password"
                    onFocus={() => handleFocusOnPassword(true)}
                    onBlur={() => handleFocusOnPassword(false)}
                    onChange={handleChangeUserInfo("confirmPassword")}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={loading} onClick={handleConfirmModifyUser}>
            {loading ? "Loading..." : "Xác nhận"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModifyUserModal;
