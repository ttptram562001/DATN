import ClassNames from "classnames/bind";
import moment from "moment";
import styles from "./OrderStatistic.module.scss";
import { useState } from "react";
import statisticApi from "../../../../../../api/statisticApi";
import { Table } from "antd";

const cx = ClassNames.bind(styles);

function OrderStatistic() {
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [dataSource, setDataSource] = useState();

  const handleChangeDateFrom = (event) => {
    setDateFrom(event.target.value);
  };

  const handleChangeDateTo = (event) => {
    console.log(event.target.value);
    setDateTo(event.target.value);
  };

  const handleSendDate = () => {
    statisticApi
      .getOrderBetweenDays(dateFrom, dateTo)
      .then((res) => setDataSource(res.data));
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      width: 100,
    },
    {
      title: "Mã sách",
      dataIndex: "bookCode",
      width: 100,
    },
    {
      title: "Tên sách",
      dataIndex: "bookName",
      width: 200,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 200,
      sorter: {
        compare: (a, b) =>
          moment(a.createdAt, "DD-MM-YYYY") - moment(b.createdAt, "DD-MM-YYYY"),
      },
      render: (createdAt) => {
        return <p>{moment(createdAt).format("DD-MM-YYYY")}</p>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      width: 200,
    },
    {
      title: "Đơn giá",
      dataIndex: "pricePerUnit",
      width: 200,
      render: (pricePerUnit) =>
        pricePerUnit.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      width: 200,
      render: (totalPrice) =>
        totalPrice.toLocaleString("vi", { style: "currency", currency: "VND" }),
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <h1>Bảng Thống Kê</h1>
      <span>Ngày</span>
      <div className={cx("date-input")}>
        <div className={cx("date-from")}>
          <span>Từ</span>
          <input type="date" value={dateFrom} onChange={handleChangeDateFrom} />
        </div>
        <div className={cx("date-to")}>
          <span>Đến</span>
          <input type="date" value={dateTo} onChange={handleChangeDateTo} />
        </div>
        <div className={cx("btn-search")} onClick={handleSendDate}>
          <button>Tìm kiếm</button>
        </div>
      </div>
      <div className="order-table-container">
        <Table
          className="order-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
}

export default OrderStatistic;
// dataSource={listUser}
