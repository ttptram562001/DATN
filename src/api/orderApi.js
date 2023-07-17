import axiosClient from "./axiosClient";
import { url } from "./constants";

const orderApi = {
  createOrder: (params) => {
    const requestUrl = url + "/api/orders";
    return axiosClient.post(requestUrl, params);
  },

  getAll: () => {
    const requestUrl = url + "/api/orders";
    return axiosClient.get(requestUrl);
  },

  getOrderDetail: (idOrder) => {
    const requestUrl = url + `/api/orders/get-order-detail/${idOrder}`;
    return axiosClient.get(requestUrl);
  },

  getOrdersByUsername: (username) => {
    const requestUrl = url + `/api/orders/${username}`;
    return axiosClient.get(requestUrl);
  },

  updateStatus: (idOrder, idStatus) => {
    const requestUrl = url + `/api/orders/update-status/${idOrder}/${idStatus}`;
    return axiosClient.post(requestUrl)
  }
};

export default orderApi;
