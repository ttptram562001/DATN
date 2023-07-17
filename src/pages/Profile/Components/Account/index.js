import classNames from "classnames/bind";
import styles from "./Account.module.scss";
import { useEffect, useState } from "react";
import accountApi from "../../../../api/accountApi";
const cx = classNames.bind(styles);

function Account({ user }) {
  const [infoUser, setInfoUser] = useState({
    id: "",
    username: "",
    phoneNumber: "",
    email: "",
    address: "",
    dob: "",
    active: true,
  });
  const { id, username, phoneNumber, email, address, dob, active } = infoUser;
  useEffect(() => {
    accountApi.getAccountByUsername(user).then((res) => {
      setInfoUser(res.data)
    });
  }, []);

  const handleChange = (event) => {
    setInfoUser({ ...infoUser, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    console.log(typeof dob)

    console.log(infoUser);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-account")}>
        <div>Hồ sơ của tôi</div>
        <span>Quản lí thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className={cx("info-account")}>
        <div className={cx("username")}>
          <span>Tên đăng nhập</span>
          <input type="text" value={username} />
        </div>
        <div className={cx("email")}>
          <span>Địa chỉ email</span>
          <input
            type="text"
            placeholder="Cập nhật email"
            value={email}
            name="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className={cx("phone")}>
          <span>Số điện thoại</span>
          <div>{infoUser.phoneNumber}</div>
        </div>
        <div className={cx("dob")}>
          <span>Ngày sinh</span>
          <input
            type="date"
            value={dob}
            onChange={handleChange}
            name="dob"
          />
        </div>
        <div className={cx("button-save")}>
          <button onClick={handleSave}>Lưu</button>
        </div>
      </div>
    </div>
  );
}

export default Account;
