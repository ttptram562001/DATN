import classNames from "classnames/bind";
import styles from "./Receipt.module.scss";
import { useEffect, useState } from "react";
import orderApi from "../../../../api/orderApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTruck,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { url } from "../../../../api/constants";
const cx = classNames.bind(styles);

function Receipt({ user }) {
  const [active, setActive] = useState(null);
  const [orders, setOrders] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const listStatus = [
    {
      id: 0,
      icon: faCartShopping,
      name: "Chờ xác nhận",
    },
    {
      id: 1,
      icon: faGear,
      name: "Đang chuẩn bị hàng",
    },
    {
      id: 2,
      icon: faTruck,
      name: "Đang giao",
    },
    {
      id: 3,
      icon: faHouse,
      name: "Đã nhận được hàng",
    },
  ];

  useEffect(() => {
    orderApi.getOrdersByUsername(user).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleClick = (status) => {
    if (status.id == active) {
    } else {
      setActive(status.id);
      setDataSource([]);
      switch (status.id) {
        case 0:
          orders
            ?.filter((order) => order?.status === "Chờ xác nhận")
            ?.map((o) =>
              orderApi
                .getOrderDetail(o.id)
                .then((res) => setDataSource([...dataSource, res.data]))
            );
          break;
        case 1:
          orders
            ?.filter((order) => order?.status === "Đang chuẩn bị hàng")
            ?.map((o) =>
              orderApi
                .getOrderDetail(o.id)
                .then((res) => setDataSource([...dataSource, res.data]))
            );
          break;
        case 2:
          orders
            ?.filter((order) => order?.status === "Đang giao")
            ?.map((o) =>
              orderApi
                .getOrderDetail(o.id)
                .then((res) => setDataSource([...dataSource, res.data]))
            );
          break;
        case 3:
          orders
            ?.filter((order) => order?.status === "Đã nhận được hàng")
            ?.map((o) =>
              orderApi
                .getOrderDetail(o.id)
                .then((res) => setDataSource([...dataSource, res.data]))
            );
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <h3>Đơn hàng của bạn</h3>
      <div className={cx("container")}>
        {listStatus.map((status) => (
          <div
            key={status.id}
            onClick={() => {
              handleClick(status);
            }}
            className={cx(`${active === status.id && "active"}`)}
          >
            <FontAwesomeIcon icon={status.icon} className={cx("icon")} />
            <span>{status.name}</span>
          </div>
        ))}
      </div>
      <div className={cx("content")}>
        {dataSource &&
          dataSource?.map((column) => (
            <div key={column.id} className={cx("order")}>
              {column?.orderDetailDTOS?.map((orderDetail) => (
                <div className={cx("order-detail")}>
                  <img
                    src={`${url}/file/images/${orderDetail.image}`}
                    alt=""
                    width={50}
                  />
                  <div className={cx("order-detail-info")}>
                    <span className={cx("title")}>{orderDetail.nameBook}</span>
                    <span className={cx("price")}>{orderDetail.price}</span>
                  </div>
                  <div className={cx("amount")}>x {orderDetail.amount}</div>
                </div>
              ))}
              <div className={cx("total-price")}>
                Thành tiền: <span> {column.totalPrices}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Receipt;

// className={cx(`list-group-item ${active == status.id && "active"}`)}
