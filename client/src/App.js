import React, { useEffect } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "./features/auth/authSlice";
import UserService from "./services/UserService";
import SignIn from "./components/Forms/SignIn";
import UnauthorizeRoute from "./route/UnauthorizeRoute";
import RestrictedRoute from "./route/RestrictedRoute";
import Footer from "./components/Footer/Footer";
import SignOut from "./components/Forms/SignOut";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check whether user is logged in yet via cookie
    UserService.getProfile()
      .then((response) => {
        dispatch(setSignedIn(true));
        dispatch(setPersistUser(response.data));
      })
      .catch(() => {
        // Failed to sign in
        dispatch(setSignedIn(false));
      });
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-content">
        <Switch>
          <RestrictedRoute path="/dang-xuat">
            <SignOut />
          </RestrictedRoute>
          <UnauthorizeRoute path="/dang-nhap">
            <SignIn />
          </UnauthorizeRoute>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
