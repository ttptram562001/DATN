import axiosClient from "./axiosClient";
import { url } from "./constants";

const paymentApi = {
    vnpay: (param) => {
        const requestUrl = url + "/api/vnpay";
        return axiosClient.post(requestUrl, param)
    },
    transaction: () => {
        const requestUrl = url + "/api/payment/payment-info";
        return axiosClient.get
    }
};

export default paymentApi;
