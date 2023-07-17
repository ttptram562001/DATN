import axiosClient from "./axiosClient";
import { url } from "./constants";

const authApi = {
  register: (username, password, phone) => {
    const requestUrl = url + "/register";
    return axiosClient.get(requestUrl, {
      params: {
        username,
        password,
        phone,
      },
    });
  },

  getAccountByUsername: (username) => {
    const requestUrl = url + "/api/accounts/by-username";
    return axiosClient.get(requestUrl, { params: { username: username } });
  },
};

export default authApi;
