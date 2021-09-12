import React, { useState, useEffect } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "../../app/slices/auth";
import { toast } from "react-toastify";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isValid, setIsValid] = useState(false);
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

    // Empty field means no sign in
    if (username === "" || password === "") return;

    // Sign in
    UserService.postSignIn({ username, password })
      .then(({ data }) => {
        // If success sign in
        // setResponseData()
        toast.success(data.message);
        // Navigate to home

        // Store credential and navigate to home
        dispatch(setSignedIn(true));
        dispatch(setPersistUser(data.data));
        // Navigate
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setPassword("");
      });
  };

  useEffect(() => {
    setIsValid(username !== "" && password !== "");
  }, [username, password]);

  return (
    <div className="container form--outer ">
      <form className="form formSignIn" onSubmit={handleSubmit}>
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
          <a className="link link--secondary" href="/">
            Quên mật khẩu
          </a>
          <a className="link link--secondary" href="/dang-ky">
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
