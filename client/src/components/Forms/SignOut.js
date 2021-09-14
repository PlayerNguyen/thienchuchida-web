import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setSignedIn } from "../../app/slices/auth";
import UserService from "../../services/UserService";

export default function SignOut() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    UserService.postSignOut()
      .then((e) => {
        dispatch(setSignedIn(false));
        toast.success(e.data.message);
      })
      .finally(() => {
        history.push("/");
      });
  }, [history, dispatch]);

  return <></>;
}
