import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import validateHelper, { createUserSchema, modifyUserSchema } from "../../helpers/validateHelper";

function ModifyUserModal({ visible, onConfirm, onClose, user = null, loading }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    display: "",
    email: "",
    changingPassword: false,
    password: "",
    confirmPassword: "",
  });
  const [validator, setValidator] = useState({
    passwordMatch: true,
  });
  // message when validate error
  const validatorMessages = {
    passwordMatch: "Mật khẩu không trùng khớp",
  };
  // state of interacting with inputs
  const [inputState, setInputState] = useState({
    focusPassword: false,
  });

  useEffect(() => {
    if (user) {
      // override init state with existing properties
      setUserInfo((_userInfo) => ({ ..._userInfo, ...user }));
    }
  }, [user]);

  /**
   *
   * @returns {Boolean}
   */
  const handleCheckAllValidatorsValid = () => {
    let isInputValid = true;
    Object.keys(validator).forEach((_key) => {
      if (!validator[_key]) {
        throw validatorMessages[_key];
      }
    });
    return isInputValid;
  };

  const handleConfirmModifyUser = async () => {
    try {
      let validateSchema = createUserSchema;
      // Modify user
      if (user) {
        validateSchema = modifyUserSchema;
      }
      await validateHelper.validateAsync(validateSchema, userInfo);
      handleCheckAllValidatorsValid();
      onConfirm(userInfo);
    } catch (e) {
      toast.error(e);
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
              <Form.Label>
                Tên đăng nhập <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={userInfo.username}
                name="username"
                placeholder="Nhập tên đăng nhập"
                onChange={handleChangeUserInfo("username")}
                disabled={Boolean(user)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên hiển thị <span className="text-danger">*</span></Form.Label>
              <Form.Control
                value={userInfo.display}
                name="display"
                placeholder="Nhập tên hiển thị"
                onChange={handleChangeUserInfo("display")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                value={userInfo.email}
                name="email"
                type="email"
                placeholder="Nhập email"
                onChange={handleChangeUserInfo("email")}
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
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu{userInfo.changingPassword && " mới"} <span className="text-danger">*</span></Form.Label>
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
                      <Form.Text className="text-danger">
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
