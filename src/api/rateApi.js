import axiosClient from "./axiosClient";
import axios from "axios";
import { url } from "./constants";

const rateApi = {
  // rate

  rateBook: (idBook, username, amount) => {
    const requestUrl = url + `/api/rates/${idBook}/${username}/${amount}`;
    return axiosClient.post(requestUrl);
  },

  getRate: (idBook, username) => {
    // const requestUrl = url + `/api/rates/${idBook}/${username}`;
    const requestUrl = `http://localhost:8080/api/rates/${idBook}/${username}`
    return axios.get(requestUrl);
  },
};

export default rateApi;
