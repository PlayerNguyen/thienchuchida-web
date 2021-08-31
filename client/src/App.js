import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home"
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-content">
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
