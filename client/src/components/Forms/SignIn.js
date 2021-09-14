import React, { useState, useEffect } from "react";
import "./Forms.scss";
import UserService from "../../services/UserService";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "../../app/slices/auth";
import { toast } from "react-toastify";
import Header from "../Header/Header";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
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
      .finally(() => {
        setPassword("");
      });
  };

  useEffect(() => {
    return () => {
      setIsValid(username !== "" && password !== "");
    };
  }, [username, password]);

  return (
    <div> 
      <Header/>
      <div className="container form--outer ">
      <form className="form formSignIn" onSubmit={handleSubmit}>
        <div className="form__header">
          <h1 className="form__header__title">Đăng nhập</h1>
        </div>
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
                value="Đăng nhập"
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
    </div>
  );
}
