import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Order.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../api/axiosClient";
import accountApi from "../../api/accountApi";
import orderApi from "../../api/orderApi";
import paymentApi from "../../api/paymentApi";
import { redirect } from "react-router-dom";
import addressApi from "../../api/addressApi";
const cx = classNames.bind(styles);

function Order() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [detailAdd, setDetailAdd] = useState("");
  const [payment, setPayment] = useState();
  const [showModal, setShowModal] = useState(false);
  const { state } = useLocation();
  const [addressList, setAddressList] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const subtotal = state?.data?.reduce(
    (pre, order) => order.amount * order.book.price + pre,
    0
  );
  console.log(state);
  const host = "http://localhost:8080/api/provinces";
  //

  const {
    authState: { user },
  } = useContext(AuthContext);

  console.log(user);
  // render data
  var renderData = (array, select) => {
    let row = ' <option disable value="">chọn</option>';
    array.forEach((element) => {
      row += `<option value="${element.code}" class="${element.code}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  // call api
  var callAPI = async (api) => {
    const response = await axiosClient.get(api);
    renderData(response.data, "province");
  };

  var callApiDistrict = async (api) => {
    const response = await axiosClient.get(api);
    renderData(response.data.districts, "district");
  };

  var callApiWard = async (api) => {
    const response = await axiosClient.get(api);
    renderData(response.data.wards, "ward");
  };

  const handleChangeProvince = (e) => {
    setProvince(e.target.value);
    console.log(province);
    callApiDistrict(host + "/" + e.target.value);
  };

  const handleChangeDistrict = (e) => {
    setDistrict(e.target.value);
    console.log(province);
    callApiWard("http://localhost:8080/api/districts" + "/" + e.target.value);
  };

  useEffect(() => {
    callAPI(host);
    accountApi
      .getAccountByUsername(user)
      .then((res) => setAddressList(res.data.addresses));
  }, []);

  const handleCheckout = () => {
    const orderDetailDTOList = [];
    state?.data.map((value) =>
      orderDetailDTOList.push({ amount: value.amount, idBook: value.book.id })
    );
    if (address != null) {
      if (payment == 23) {
        const param = {
          orderDTO: {
            username: user,
            address: address,
            idPaymentType: 23,
            priceBooks: subtotal,
          },
          orderDetailDTOList: orderDetailDTOList,
        };
        orderApi.createOrder(param);
        navigate("/");
      } else {
        const param = {
          orderDTO: {
            username: user,
            address: address,
            idPaymentType: 24,
            priceBooks: subtotal,
          },
          orderDetailDTOList: orderDetailDTOList,
        };
        paymentApi
          .vnpay(param)
          .then((res) => window.location.replace(res.data.url));
      }
    } else {
      addressApi.getAddress(province, district, ward).then((res) => {
        if (payment == 23) {
          const param = {
            orderDTO: {
              username: user,
              address: `${name}-${phone}-${detailAdd},${res.data}`,
              idPaymentType: 23,
              priceBooks: subtotal,
            },
            orderDetailDTOList: orderDetailDTOList,
          };
          orderApi.createOrder(param);
          navigate("/");
        } else {
          const param = {
            orderDTO: {
              username: user,
              address: `${name}-${phone}-${detailAdd},${res.data}`,
              idPaymentType: 24,
              priceBooks: subtotal,
            },
            orderDetailDTOList: orderDetailDTOList,
          };
          paymentApi
            .vnpay(param)
            .then((res) => window.location.replace(res.data.url));
        }
      });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleChangeModelAdd = (e) => {
    console.log(e.target.value);
    const add = addressList[e.target.value];
    const a = `${add.name} - ${add.phone} - ${add.detailAddress}, ${add.address}`;
    setAddress(a);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("information")}>
        <Link to={"/"}>
          <img
            src="https://wpbingosite.com/wordpress/bookio/wp-content/webp-express/webp-images/uploads/2021/08/logo-1.png.webp"
            alt=""
            width={240}
          />
        </Link>
        <div className={cx("contact")}>
          <span>Liên hệ</span>
          <div className={cx("contact-info")}>
            <input
              type="text"
              placeholder="Số điện thoại liên lạc"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Họ và Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("shipping-address")}>
          <span>Địa chỉ nhận hàng</span>
          <div className={cx("shipping-address-info")}>
            <select
              className={cx("province")}
              value={province}
              onChange={(e) => handleChangeProvince(e)}
              name=""
              id="province"
            >
              <option value="">Tỉnh, Thành phố</option>
            </select>
            <div className={cx("district-ward")}>
              <select
                className={cx("district")}
                id="district"
                value={district}
                onChange={(e) => handleChangeDistrict(e)}
              >
                <option value="">Quận, Huyện</option>
              </select>
              <select
                className={cx("ward")}
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              >
                <option value="">Thành phố</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Địa chỉ cụ thể"
              value={detailAdd}
              onChange={(e) => setDetailAdd(e.target.value)}
            />
            <div className={cx("access-modal")} onClick={handleShowModal}>
              Sử dụng địa chỉ đã lưu
            </div>
            {address ?? address}
          </div>
        </div>
        <div className={cx("payment")}>
          <span>Hình thức thanh toán</span>
          <input
            type="radio"
            id="vnpay"
            name="payment"
            value={24}
            onChange={(e) => setPayment(e.target.value)}
          />
          <img
            src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd2w2SHc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--86c9a5822c522ee441f5a6e55a9c9cfdc61b09bc/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/logo%20VNPAY-02.png"
            alt=""
            width={100}
          />
          <input
            type="radio"
            id="home"
            name="payment"
            value={23}
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="home">Thanh toán khi nhận hàng</label>
        </div>
        <div className={cx("bottom")}>
          <Link>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={cx("btn-return")}
            />
            <Link to={"/cart"}>
              <span className={cx("btn-return")}>Trở về giỏ hàng</span>
            </Link>
          </Link>
          <div className={cx("checkout")} onClick={handleCheckout}>
            <button>Đặt hàng</button>
          </div>
        </div>
      </div>
      <div className={cx("order-details")}>
        {state?.data?.map((order, index) => (
          <div className={cx("order-detail")} key={index}>
            <img
              src={`http://localhost:8080/file/images/${order.book.image}`}
              alt=""
              width={60}
            />
            <div className={cx("title")}>
              <div>{order.book.title}</div>
              <div className={cx("amount")}> {order.amount}</div>
            </div>
            <div className={cx("price")}>{order.book.price}</div>
          </div>
        ))}
        <div className={cx("subtotal")}>
          <div>Tổng tiền sách:</div>
          <div className={cx("subtotal-value")}>{subtotal}</div>
        </div>
        <div className={cx("delivery")}>
          <div>Phí vận chuyển:</div>
          <div className={cx("delivery-value")}>30.000</div>
        </div>
        <div className={cx("total")}>
          <div>Tổng:</div>
          <div className={cx("total-value")}>{subtotal + 30000}</div>
        </div>
      </div>
      <Modal
        title="Địa chỉ đã lưu"
        open={showModal}
        onCancel={() => {
          setAddress();
          setShowModal(false);
        }}
        onOk={() => setShowModal(false)}
      >
        {addressList?.map((address, index) => (
          <div className={cx("address-list")}>
            <input
              type="radio"
              id="preAdd"
              name="preAdd"
              value={index}
              onChange={handleChangeModelAdd}
            />
            <label htmlFor={address.id}>
              <div className={cx("name-contact")}>
                {address.name} | {address.phone}
              </div>
              <div>
                {address.detailAddress}, {address.address}
              </div>
            </label>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default Order;
