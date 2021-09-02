import React, { useState } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "../../features/auth/authSlice";

const NAVIGATE_DURATION = 3000;

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent a submit form action
    e.preventDefault();

    // Sign in
    UserService.postSignIn({ username, password })
      .then(({ data }) => {
        // If success sign in
        setResponseData(data);
        // Navigate to home

        setTimeout(() => {
          // Set signed in first
          dispatch(setSignedIn(true));
          dispatch(setPersistUser(data.data));
          // Navigate
          history.push("/");
        }, NAVIGATE_DURATION);
      })
      .catch((err) => {
        setResponseData(err.response.data);
      });
  };

  return (
    <div className="form--outer">
      <form className="form form--sign-in" onSubmit={handleSubmit}>
        <div className="form__header">
          <h1 className="form__header__title">Đăng nhập</h1>
        </div>
        {responseData && (
          <div
            className={`form__response form__response--${
              responseData.error ? `error` : `success`
            }`}
          >
            {responseData.error
              ? responseData.error.message
              : responseData.message}
          </div>
        )}
        <div className="form__container">
          <div className="form__container--block">
            <div className="form--label">Email / Tên đăng nhập</div>
            <div className="form__input__outer">
              <input
                type="text"
                className="input"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          </div>
          <div className="form__container--block">
            <div className="form--label">Mật khẩu</div>
            <div className="form__input__outer">
              <input
                type="password"
                className="input"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="form__container--block">
            <div className="form__input__outer">
              <input
                type="submit"
                className="input input--submit"
                value="Đăng nhập"
              />
            </div>
          </div>
        </div>
        <div className="form__footer">
          <a className="link link--secondary" href="/">
            Quên mật khẩu
          </a>
          <a className="link link--secondary" href="/">
            Tạo tài khoản
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
  );
}
