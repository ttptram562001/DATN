import React, { useContext } from "react";
import SignUp from "./components/signup/signup";
import Login from "./components/signin/login";
import Logout from "./components/logout/logout";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import classNames from "classnames/bind";
import styles from "./auth.module.scss";

const cx = classNames.bind(styles);

function Auth({ authRoute }) {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);

  let body;

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    if (authRoute === "logout")
      body = (
        <>
          <Logout />
        </>
      );
    else {
      if (role.includes('ROLE_ADMIN') || role.includes('ROLE_MANAGER'))
        return <Navigate to="/admin" />;
      return <Navigate to="/" />;
    }
  } else
    body = (
      <>
        {authRoute === "login" && <Login />}
        {authRoute === "register" && <SignUp />}
      </>
    );

  return (
    <div className={cx("wrapper")}>
     {body}
    </div>
  );
}

export default Auth;
