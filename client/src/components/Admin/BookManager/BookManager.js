import React, { useState } from "react";
import BookEditor from "./BookEditor";
import "./BookManager.scss";
import BookSelector from "./BookSelector";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export default function BookManager() {
  // const [currentBook, setCurrentBook] = useState(null);

  const { path } = useRouteMatch();

  return (
    <div className="bookmanager">
      <div className="bookmanager__titlebar">
        <h1 className="title text-dark">Truyện</h1>
        {/* <h1 className="title text-secondary">Tiếp theo</h1> */}
      </div>
      <div className="bookmanager__main">
        {/* {!currentBook ? (
          <BookSelector setCurrentBook={setCurrentBook} />
        ) : (
          <BookEditor />
        )} */}
        <Switch>
          <Route path={`${path}/:bookSlug`}>
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
