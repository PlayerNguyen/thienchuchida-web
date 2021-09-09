import React, { useEffect, useState } from "react";
import "./App.scss";
import Home from "./components/Home/Home";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPersistUser, setSignedIn } from "./app/slices/auth";
import UserService from "./services/UserService";
import SignIn from "./components/Forms/SignIn";
import UnauthorizeRoute from "./route/UnauthorizeRoute";
import RestrictedRoute from "./route/RestrictedRoute";
import SignOut from "./components/Forms/SignOut";
import Book from "./components/Book/Book";
import Admin from "./components/Admin/Admin";
import Profile from "./components/Profile/Profile";
import AdminRestrictedRoute from "./route/AdminRestrictedRoute";

function App() {
  const dispatch = useDispatch();
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    document.title = "Thiên Chu Chi Dạ";
    // Check whether user is logged in yet via cookie
    UserService.getProfile()
      .then((response) => {
        dispatch(setSignedIn(true));
        dispatch(setPersistUser(response.data));
      })
      .catch(() => {
        // Failed to sign in
        dispatch(setSignedIn(false));
      })
      .finally(() => {
        setIsWaiting(false);
      });
  }, [dispatch]);

  return (
    <div className="app-wrapper">
      {/* <div className="app-header">
        <Header />
      </div>
      <div className="app-content">
        
      </div>
      <div className="app__footer">
        <Footer />
      </div> */}

      <div className="app__content">
        {isWaiting ? (
          <></>
        ) : (
          <Switch>
            <AdminRestrictedRoute path="/admin">
              {/* Inspect admin app here */}
              <Admin />
            </AdminRestrictedRoute>

            <RestrictedRoute path="/thong-tin">
              <Profile />
            </RestrictedRoute>

            <RestrictedRoute path="/dang-xuat">
              <SignOut />
            </RestrictedRoute>

            <UnauthorizeRoute path="/dang-nhap">
              <SignIn />
            </UnauthorizeRoute>

            <Route path="/truyen/:slug">
              <Book />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default App;
