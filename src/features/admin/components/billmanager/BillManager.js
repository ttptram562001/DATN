import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPhone,
  faUser,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./BillManager.scss";
import { Table, Space, Input, Modal } from "antd";
import orderApi from "../../../../api/orderApi";
import moment from "moment";
import "./BillManager.scss";

const { Search } = Input;

const BillManager = () => {
  const [listOrder, setlistOrder] = useState([]);
  const [listOrderAll, setlistOrderAll] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [status, setStatus] = useState();
  const {
    id,
    bookPrices,
    deliveryCost,
    paymentTypeName,
    username,
    phoneNumber,
    address,
    createdAt,
  } = modelCurrentAction;
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    orderApi
      .getAll()
      .then((res) => {
        console.log(res);
        setlistOrder(res.data);
        setlistOrderAll(res.data);
      })
      .catch((error) => {
        console.log("Failed to fetch UserList:", error);
      });
  }, []);

  const showShowModal = () => {
    setIsModalShowVisible(true);
  };
  const handleShowOk = () => {
    orderApi.updateStatus(id, status).then((res) => console.log(res.data));
    setIsModalShowVisible(false);
    if (status !== orderDetails.currentStatus.id) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
  };
  const handleShowCancel = () => {
    setIsModalShowVisible(false);
  };

  const searchClick = () => {
    const filteredData = listOrderAll.filter(
      (entry) =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        (entry.name || "")
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (entry.phone_number || "").toLowerCase() == searchValue.toLowerCase()
    );
    setlistOrder(filteredData);
  };

  const searchChange = (user) => setSearchValue(user.target.value);

  const handleUpdateStatus = (e) => {
    setStatus(e.target.value);
  };

  const columns = [
    {
      title: "NGÀY TẠO",
      dataIndex: "createdAt",
      width: 200,
      render: (createdAt) => {
        return <p>{moment(createdAt).format("HH:MM DD-MM-YYYY")}</p>;
      },
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: "MÃ ĐƠN HÀNG",
      dataIndex: "id",
      filterMode: "tree",
      width: 200,
    },
    {
      title: "ĐỊA CHỈ NHẬN HÀNG",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
    },
    {
      title: "THÀNH TIỀN",
      dataIndex: "bookPrices",
      render: (bookPrices) =>
        bookPrices.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
      width: 200,
    },

    {
      title: "TÌNH TRẠNG",
      dataIndex: "status",
      width: 200,
    },

    {
      title: "Action",
      key: "action",
      render: (index, record) => (
        <Space className="action-button" size="large">
          <FontAwesomeIcon
            icon={faPen}
            type="button"
            onClick={() => {
              setModelCurrentAction(record);
              orderApi.getOrderDetail(record.id).then((res) => {
                setOrderDetails(res.data);
                setStatus(res.data.currentStatus.id);
                console.log(res.data);
              });
              showShowModal();
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title=""
        open={isModalShowVisible}
        width={700}
        onOk={handleShowOk}
        onCancel={handleShowCancel}
      >
        <div className="shipment-info">
          <div className="name-phone">
            <div>
              <FontAwesomeIcon icon={faUser} className="icon" />
              <span>
                {orderDetails.address && orderDetails?.address.split("-")[0]}
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <span>
                {orderDetails.address && orderDetails.address.split("-")[1]}
              </span>
            </div>
          </div>
          <div className="address">
            <FontAwesomeIcon icon={faLocationDot} className="icon" />
            <span>
              {orderDetails.address && orderDetails?.address.split("-")[2]}
            </span>
          </div>
        </div>
        <div className="payment-method">
          <span>Phương thức thanh toán: </span>
          <div>{orderDetails?.paymentType}</div>
        </div>
        <div className="order-status">
          <span>Trạng thái đơn hàng:</span>
          <select value={status} onChange={handleUpdateStatus}>
            <option value="4">Chờ xác nhận</option>
            <option value="5">Đang chuẩn bị hàng</option>
            <option value="6">Đang giao</option>
            <option value="7">Đã nhận được hàng</option>
          </select>
        </div>
        <div className="detail-order">
          <div className="table-detail-order title-table">
            <span className="col-1">STT</span>
            <span className="col-3">TÊN SẢN PHẨM</span>
            <span className="col-2">GIÁ</span>
            <span className="col-2">SỐ LƯỢNG</span>
            <span className="col-2">THÀNH TIỀN</span>
          </div>
          {orderDetails?.orderDetailDTOS?.map((o, index) => (
            <div key={index} className="table-detail-order data-row">
              <span className="col-1">{index + 1}</span>
              <span className="col-3">{o.nameBook}</span>
              <span className="col-2">{o.price}</span>
              <span className="col-2">{o.amount}</span>
              <span className="col-2">{o.price * o.amount}</span>
            </div>
          ))}
        </div>
        <div className="total-price">
          <div>Thành tiền:</div>
          <span>{orderDetails?.totalPrices}</span>
        </div>
      </Modal>
      {isAlertVisible && (
        <div className="alert-container">
          <div className="alert-inner">
            Bạn vừa cập nhật trạng thái đơn hàng thành công !
          </div>
        </div>
      )}
      <div className="user-utilities">
        <Search
          allowClear
          className="search"
          placeholder="Input search text"
          enterButton
          onSearch={searchClick}
          value={searchValue}
          onChange={searchChange}
        />
      </div>
      <div className="user-table-container">
        <Table
          className="user-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listOrder}
        />
      </div>
    </>
  );
};

export default BillManager;
