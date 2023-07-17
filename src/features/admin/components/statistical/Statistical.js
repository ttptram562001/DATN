import React from "react";
import Widget from "./components/Widget/index.js";
import Feature from "./components/Feature/index.js";
import Chart from "./components/chart/Chart";
import OrderStatistic from "./components/OrderStatistic/index.js";
import { Table } from "antd";

const Statistical = () => {
  return (
    <>
      <div className="widgets">
        <Widget type="users" />
        <Widget type="orders" />
        <Widget type="earnings" />
      </div>
      <div className="charts">
        <Feature />
        <Chart />
      </div>
      <div className="user-table-container">
        <OrderStatistic />
      </div>
    </>
  );
};

export default Statistical;
