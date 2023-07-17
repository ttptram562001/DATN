import "./admin.scss";
import Sidebar from "./components/sidebar/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import Statistical from "../admin/components/statistical/Statistical";
import UserManager from "../admin/components/usermanager/UserManager";
import BookManager from "./components/bookmanger/BookManager";
import TagManager from "./components/tagmanager/Tagmanger";
import Navbar from "./components/navbar/Navbar";
import React, { useContext } from "react";
// import { Navigate } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import EmployeeManager from "./components/employee-manager/EmployeeManager";
import CommentManager from "./components/comment-manager/CommentManager";
import BillManager from "./components/billmanager/BillManager";

const Amin = ({ adminRoute }) => {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);
  var body = <></>;
  var content = <></>;
  if (authLoading) {
    body = (
      <div
        className="d-flex justify-content-center mt-2"
        style={{ width: "100vw", height: "100vh", "padding-top": "20%" }}
      >
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (!isAuthenticated || role == "ROLE_USER")
    return <>You don't have access</>; 
  else {
    if (adminRoute === "dashboard") content = <Statistical />;
    else if (adminRoute === "user") content = <UserManager />;
    else if (adminRoute === "book") content = <BookManager />;
    else if (adminRoute === "tag") content = <TagManager />;
    else if (adminRoute === "employee") content = <EmployeeManager />;
    else if (adminRoute === "bill") content = <BillManager />;
    else if (adminRoute === "comment") content = <CommentManager />;
    else content = <Statistical />;

    body = (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          {content}
        </div>
      </div>
    );
  }

  return <>{body}</>;
};

export default Amin;
