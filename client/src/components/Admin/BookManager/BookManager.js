import React from "react";
import BookEditor from "./BookEditor";
import "./BookManager.scss";
import BookSelector from "./BookSelector";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function BookManager() {
  const { path } = useRouteMatch();

  return (
    <div className="bookmanager">
      <div className="bookmanager__titlebar">
        <h1 className="title text-dark">Truyện</h1>
      </div>
      <div className="bookmanager__main">
        <Switch>
          <Route path={`${path}/:bookId`}>
            <BookEditor />
          </Route>
          <Route>
            <BookSelector />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
