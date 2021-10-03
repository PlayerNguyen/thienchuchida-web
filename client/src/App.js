import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./components/Home/Home";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "./app/slices/auth";
import UserService from "./services/UserService";
import SettingServer from "./services/SettingService";
import SignIn from "./components/Forms/SignIn";
import UnauthorizeRoute from "./route/UnauthorizeRoute";
import RestrictedRoute from "./route/RestrictedRoute";
import SignOut from "./components/Forms/SignOut";
import Book from "./components/Book/Book";
import BookReader from "./components/Book/BookReader";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import AdminRestrictedRoute from "./route/AdminRestrictedRoute";
import SignUp from "./components/Forms/SignUp";
import useDisableRightClick from "./hooks/useDisableRightClick";
import { Container } from "react-bootstrap";
import NotFound from "./components/Error/NotFound";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();
  const [isWaiting, setIsWaiting] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [background, setBackground] = useState("");

  // Disable right click
  useDisableRightClick();

  useEffect(() => {
    // Wait for an app to response
    setIsWaiting(true);
    // Set cute title for this app
    document.title = "Thiên Chu Chi Dạ";
    // Check whether user is logged in yet via cookie
    UserService.getProfile()
      .then((response) => {
        const { error } = response.data;
        if (!error) {
          dispatch(setPersistUser(response.data));
          dispatch(setSignedIn(true));
          return;
        }
        // Set user is signed in when not found error
        dispatch(setSignedIn(false));
      })
      .catch((err) => {
        // Network error
        // console.log(err.response);
        if (err.response === undefined) {
          setNetworkError(true);
          return;
        }

        // Failed to sign in
        dispatch(setSignedIn(false));
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }, [dispatch]);

  useEffect(() => {
    SettingServer.getSetting(`background-url`).then((response) => {
      const { value } = response.data;
      // console.log(value);
      setBackground(value);
    });
  }, []);

  return (
    <div className="app__wrapper">
      <div
        className="app__background"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="app__background__outer"></div>
      {isWaiting ? (
        <Loading />
      ) : !networkError ? (
        <div className="app__content">
          {isWaiting ? (
            <></>
          ) : (
            <Switch>
              <AdminRestrictedRoute path="/admin">
                <Admin />
              </AdminRestrictedRoute>

              <RestrictedRoute path="/thong-tin">
                <Profile />
              </RestrictedRoute>

              <RestrictedRoute path="/dang-xuat">
                <SignOut />
              </RestrictedRoute>

              <UnauthorizeRoute path="/dang-ky">
                <SignUp />
              </UnauthorizeRoute>

              <UnauthorizeRoute path="/dang-nhap">
                <SignIn />
              </UnauthorizeRoute>

              <Route path="/truyen/:bookSlug/:chapterId">
                <BookReader />
              </Route>

              <Route path="/truyen/:bookSlug">
                <Book />
              </Route>

              <Route path="/" exact>
                <Home />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          )}
        </div>
      ) : (
        <Container fluid>
          <div className="text-light text-center pt-5">
            <h1 className="m-5">
              Đã có lỗi khi kết nối đến máy chủ. <br />
              Vui lòng quay lại sau vài phút.
            </h1>
            <h1 className="text-monospace fw-light" style={{ fontSize: 40 }}>
              T.T
            </h1>
          </div>
        </Container>
      )}
    </div>
  );
}

export default App;
