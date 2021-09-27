import React, { useState, useEffect } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MiscConfig from "../../config/misc.config";
import Header from "../Header/Header";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [display, setDisplay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isRepasswordValid, setIsRepasswordValid] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  // const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRepasswordChange = (e) => {
    setRepassword(e.target.value);
  };

  const handleChangeDisplay = ({ target }) => {
    setDisplay(target.value);
  };

  const handleSubmit = (e) => {
    // Prevent a submit form action
    e.preventDefault();

    // Empty field means no sign in
    if (username === "" && password === "") return;

    // Field validation: password must greater than configured value
    if (password.length < MiscConfig.PASSWORD_MINIMUM_LENGTH) {
      return toast.error(
        `Mật khẩu phải lớn hơn ${MiscConfig.PASSWORD_MINIMUM_LENGTH} chữ số.`
      );
    }

    // Sign in
    UserService.postSignUp({ username, password, email })
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
    setPasswordValid(password.length >= MiscConfig.PASSWORD_MINIMUM_LENGTH);
  }, [password]);

  useEffect(() => {
    setIsRepasswordValid(password === repassword);
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

  return (
    <div>
      <Header />
      <div className="container form--outer ">
        <form className="form formSignUp" onSubmit={handleSubmit}>
          <div className="form__header">
            <h1 className="form__header__title">Đăng ký</h1>
          </div>
          {/* display name */}
          <div className="form__container">
            <div className="form__container--block">
              <div className="form--label">Tên hiển thị</div>
              <div className="form__input__outer">
                <input
                  type="text"
                  className="input"
                  value={display}
                  onChange={handleChangeDisplay}
                />
              </div>
              <small className="input__description">
                Dùng để hiển thị khi bạn tương tác với mọi người
              </small>
            </div>

            {/* sign up username */}
            <div className="form__container--block">
              <div className="form--label">Tên đăng nhập</div>
              <div className="form__input__outer">
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>
            {/* email */}
            <div className="form__container--block">
              <div className="form--label">Email</div>
              <div className="form__input__outer">
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            {/* password */}
            <div className="form__container--block">
              <div className="form--label">Mật khẩu</div>
              <div className="form__input__outer">
                <input
                  type="password"
                  className={`input ${
                    password !== "" &&
                    (isPasswordValid ? `input--success` : `input--danger`)
                  }`}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <small className="input__description">
                  Mật khẩu phải có ít nhất 8 ký tự
                </small>
              </div>
            </div>
            {/* repassword */}
            <div className="form__container--block">
              <div className="form--label">Nhập lại mật khẩu</div>
              <div className="form__input__outer">
                <input
                  type="password"
                  className={`input ${
                    repassword !== "" &&
                    (isRepasswordValid ? `input--success` : `input--danger`)
                  }`}
                  value={repassword}
                  onChange={handleRepasswordChange}
                />
              </div>
            </div>
            {/* sign up button */}
            <div className="form__container--block">
              <div className="form__input__outer">
                <input
                  type="submit"
                  className={`input input--submit ${
                    !isValid && `input--disabled`
                  }`}
                  disabled={!isValid}
                  value="Đăng ký"
                />
              </div>
            </div>
          </div>
          
          <div className="form__footer">
            <a className="link link--secondary" href="/dang-nhap">
              Đăng nhập
            </a>
          </div>
        </form>
        <div className="form form--others">
          <div className="form__header">
            <h1 className="form__header__title form__header__title--lighter">
              hoặc đăng nhập bằng:
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
