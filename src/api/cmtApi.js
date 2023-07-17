import axiosClient from "./axiosClient";
import axios from "axios";
import { url } from "./constants";

const cmtApi = {
  getAll: () => {
    const requestUrl = "http://localhost:8080/api/comments/";
    return axiosClient.get(requestUrl);
  },

  createCmt: (data) => {
    const requestUrl = "http://localhost:8080/api/comments";
    return axiosClient.post(requestUrl, data);
  },

  activeCmt: (idCmt) => {
    const requestUrl = `http://localhost:8080/api/comments/active-cmt/${idCmt}`;
    return axiosClient.post(requestUrl);
  },
};

export default cmtApi;
