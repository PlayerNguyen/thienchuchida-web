import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSignedIn } from "../../features/auth/authSlice";
import UserService from "../../services/UserService";


export default function SignOut() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    UserService.postSignOut().then((e) => {
      history.push("/");
      dispatch(setSignedIn(false))
    });
  }, [history, dispatch ]);

  return <></>;
}
