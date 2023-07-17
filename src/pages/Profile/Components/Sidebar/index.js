import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar({user}) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("avatar")}>
        {/* <img
          src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
          alt=""
          width={60}
        /> */}
        <div>{user}</div>
      </div>
      <div className={cx("account")}>
        <FontAwesomeIcon icon={faUser} className={cx("icon-account")} />
        <div className={cx("title-account")}>
          <Link to="/profile/account">
            <div>Tài khoản của tôi</div>
          </Link>
          <Link to="/profile/account">
            <div>Hồ sơ</div>
          </Link>
          <Link to="/profile/address">
            <div>Địa chỉ</div>
          </Link>
          <Link to="/profile/password">
            <div>Đổi mật khẩu</div>
          </Link>
        </div>
      </div>
      <div className={cx("order")}>
        <FontAwesomeIcon icon={faReceipt} className={cx("icon-order")} />
        <Link to="/profile/receipt">
          <div className={cx("title-order")}>Hóa đơn</div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
