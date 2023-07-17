import classNames from "classnames/bind";
import styles from "./Address.module.scss";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import accountApi from "../../../../api/accountApi";
import addressApi from "../../../../api/addressApi";

const cx = classNames.bind(styles);
function Address({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [addressList, setAddressList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [modelAdd, setModelAdd] = useState({
    usernameAdd: "",
    phoneAdd: "",
    detailAddress: "",
    address: "",
    address_type: "",
    default_address: false,
  });
  const {
    usernameAdd,
    phoneAdd,
    detailAddress,
    address,
    address_type,
    default_address,
  } = modelAdd;
  const [infoUser, setInfoUser] = useState({
    id: "",
    username: "",
    phoneNumber: "",
    email: "",
    addresses: "",
    dob: "",
    active: true,
  });

  const { id, username, phoneNumber, email, addresses, dob, active } = infoUser;

  const host = "http://localhost:8080/api/provinces";

  // render data
  var renderData = (array, select) => {
    let row = ' <option disable value="">chọn</option>';
    array.forEach((element) => {
      row += `<option value="${element.code}" class="${element.code}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  //
  useEffect(() => {
    accountApi.getAccountByUsername(user).then((res) => {
      setInfoUser(res.data);
      setAddressList(res.data.addresses);
      console.log(res.data?.addresses);
    });
  }, []);

  // call api
  var callAPI = async (api) => {
    const response = await axios.get(api);
    renderData(response.data, "province");
  };

  var callApiDistrict = async (api) => {
    const response = await axios.get(api);
    renderData(response.data.districts, "district");
  };

  var callApiWard = async (api) => {
    const response = await axios.get(api);
    renderData(response.data.wards, "ward");
  };

  const handleChangeProvince = (e) => {
    setProvince(e.target.value);
    console.log(province)
    callApiDistrict(host + "/" + e.target.value);
  };

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);    
    console.log(province)
    callApiWard("http://localhost:8080/api/districts" + "/" + e.target.value);
  };

  const handleChangeModelAdd = (event) => {
    setModelAdd({ ...modelAdd, [event.target.name]: event.target.value });
  };

  const checkHandler = () => {
    setIsChecked(!isChecked);
    setModelAdd({ ...modelAdd, default_address: !isChecked });
  };

  const handleAddAddress = () => {
    console.log(modelAdd)
    addressApi.addAddressForAccount(id, usernameAdd, phoneAdd, detailAddress, address, address_type, default_address)
    .then(res => {
      if(res.data !== null) {
        setModelAdd({usernameAdd: "", phoneAdd: "", detailAddress: "", address: "", address_type: "", default_address: false})
        alert("Thêm địa chỉ thành công")
        setShowModal(false)
      } else {
        alert("Vui lòng điền đầy đủ thông tin")
      }
    })
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title-address")}>
        <div>Địa chỉ của tôi</div>
        <button
          onClick={() => {
            setShowModal(true);
            callAPI(host);
          }}
        >
          Thêm địa chỉ
        </button>
      </div>
      <span>Địa chỉ</span>
      {addressList && addressList.map((add) => (
        <div className={cx("info-address")} key={add.id}>
          <div className={cx("username-phone")}>
            <div className={cx("username")}>{add.name}</div>
            <div className={cx("phone")}>{add.phone}</div>
          </div>
          <div className={cx("address-detail")}>{add.detailAddress}</div>
          <div className={cx("address")}>{add.address}</div>
          {add.default_address === true ? (
            <div className={cx("default")}>Mặc định</div>
          ) : (
            ""
          )}
        </div>
      ))}
      <Modal
        open={showModal}
        className={cx("form-add-address")}
        onCancel={() => setShowModal(false)}
        onOk={handleAddAddress}
      >
        <form action="">
          <span>Địa chỉ mới</span>
          <div className={cx("username-phone-add")}>
            <input
              type="text"
              placeholder="Họ và tên"
              value={usernameAdd}
              name="usernameAdd"
              onChange={handleChangeModelAdd}
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phoneAdd}
              name="phoneAdd"
              onChange={handleChangeModelAdd}
            />
          </div>
          <div className={cx("address-add")}>
            <select
              value={province}
              onChange={(e) => handleChangeProvince(e)}
              name=""
              id="province"
            >
              <option value="">province</option>
            </select>
            <select
              name=""
              id="district"
              value={district}
              onChange={(e) => handleChangeDistrict(e)}
            >
              <option value="">district</option>
            </select>
            <select
              name=""
              id="ward"
              value={ward}
              onChange={(e) => {
                setWard(e.target.value);
                addressApi
                  .getAddress(province, district, e.target.value)
                  .then((res) => {
                    setModelAdd({
                      ...modelAdd,
                      address: res.data,
                    });
                  });
              }}
            >
              <option value="">ward</option>
            </select>
          </div>
          <div className={cx("detail-address-add")}>
            <input
              type="text"
              placeholder="Địa chỉ cụ thể"
              value={detailAddress}
              name="detailAddress"
              onChange={handleChangeModelAdd}
            />
          </div>
          <div className={cx("address-type-add")}>
            <span>Loại địa chỉ: </span>
            <input
              type="radio"
              id="home"
              name="address_type"
              value="146"
              onClick={handleChangeModelAdd}
            />
            <label for="home">Nhà riêng</label>
            <input
              type="radio"
              id="company"
              name="address_type"
              value="147"
              onClick={handleChangeModelAdd}
            />
            <label for="company">Công ty</label>
          </div>
          <div className={cx("address-default")}>
            <input
              type="checkbox"
              id="address-default"
              name="address-default"
              checked={isChecked}
              onChange={checkHandler}
            />
            <label for="address-default">Đặt làm địa chỉ mặc định</label>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Address;
