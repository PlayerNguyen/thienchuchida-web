import React from "react";
import BookEditor from "./BookEditor";
import "./BookManager.scss";
import BookSelector from "./BookSelector";
import { Switch, useRouteMatch } from "react-router-dom";
import BookChapterEditor from "./BookChapterEditor";
import AdminRestrictedRoute from "../../../route/AdminRestrictedRoute";

export default function BookManager() {
  const { path } = useRouteMatch();

  return (
    <div className="bookmanager">
      <div className="bookmanager__titlebar">
        <h1 className="title text-dark">Truyện</h1>
      </div>
      <div className="bookmanager__main">
        <Switch>
          <AdminRestrictedRoute path={`${path}/:bookId/:chapterId`}>
            <BookChapterEditor />
          </AdminRestrictedRoute>
          <AdminRestrictedRoute path={`${path}/:bookId`}>
            <BookEditor />
          </AdminRestrictedRoute>
          <AdminRestrictedRoute>
            <BookSelector />
          </AdminRestrictedRoute>
        </Switch>
      </div>
    </div>
  );
}
