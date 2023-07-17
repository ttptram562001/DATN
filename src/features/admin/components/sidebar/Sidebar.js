import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CommentIcon from "@mui/icons-material/Comment";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

const Sidebar = () => {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin Panel</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN MENU</p>
          <Link to="/admin/dashboard">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS MENU</p>
          <Link to="/admin/user">
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          {role == "ROLE_ADMIN" ? (
            <Link to="/admin/employee">
              <li>
                <Inventory2Icon className="icon" />
                <span>Employees</span>
              </li>
            </Link>
          ) : (
            ""
          )}

          <Link to="/admin/bill">
            <li>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Bills</span>
            </li>
          </Link>
          <Link to="/admin/comment">
            <li>
              <CommentIcon className="icon" />
              <span>Comments</span>
            </li>
          </Link>
          <p className="title">PRODUCT</p>
          <Link to="/admin/book">
            <li>
              <HealthAndSafetyIcon className="icon" />
              <span>Book</span>
            </li>
          </Link>
          <p className="title">Event</p>
          <p className="title">Tag</p>
          <Link to="/admin/tag">
            <li>
              <QueryStatsIcon className="icon" />
              <span>Tag</span>
            </li>
          </Link>
          <p className="title">ACCOUNT</p>
          <Link to="/admin/profile">
            <li>
              <PersonIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/logout">
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
