import axiosClient from "./axiosClient";
import axios from "axios";
import { url } from "./constants";

const statisticApi = {
    getTotalUser: () => {
       const requestUrl = url + "/api/statistic/get-total-user";
       return axiosClient.get(requestUrl)
    },
    
    getTotalOrder: () => {
        const requestUrl = url + "/api/statistic/get-total-order";
        return axiosClient.get(requestUrl)
     },

     getEarning: () => {
        const requestUrl = url + "/api/statistic/get-earning";
        return axiosClient.get(requestUrl)
     },

     getEarningToday: () => {
        const requestUrl = url + "/api/statistic/get-earning-today";
        return axiosClient.get(requestUrl);
     },

     getOrderBetweenDays: (startDate, endDate) => {
      const requestUrl = url + `/api/statistic/get-order-between-days?startDate=${startDate}&endDate=${endDate}`;
      return axiosClient.get(requestUrl);
     }
};

export default statisticApi;
