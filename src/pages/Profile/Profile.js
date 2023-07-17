import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Sidebar from "./Components/Sidebar/index";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import Account from "./Components/Account/index";
import Address from "./Components/Address/index";
import Password  from "./Components/Password/index"
import Receipt from "./Components/Receipt/index"
import Header from "../../components/Layout/components/Header";


const cx = classNames.bind(styles);

function Profile({ profileRoute }) {
  console.log(profileRoute);
  const {
    authState: {  isAuthenticated, user },
  } = useContext(AuthContext);
  var content = <></>;

  if (!isAuthenticated) return <>You don't have access</>; // Thêm trang 404
  else {
    if (profileRoute === "") content = <Account user={user}/>;
    else if (profileRoute === "address") content = <Address user={user}/>;
    else if (profileRoute === "password") content = <Password user={user}/>;
    else if (profileRoute === "receipt") content = <Receipt user={user}/>;
    else content = <Account user={user}/>;
    return (
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("container")}>
          <Sidebar user={user}/>
          <div className={cx("content")}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
