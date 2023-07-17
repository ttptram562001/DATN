import axiosClient from "./axiosClient";
import axios from "axios";
import { url } from "./constants";

const cartApi = {
  getCartByUsername: (username) => {
    const requestUrl = "http://localhost:8080/api/carts/by-user";
    return axiosClient.get(requestUrl, { params: { username } });
  },

  addItemToCart: (username, idBook, amount) => {
    const requestUrl = `http://localhost:8080/api/carts/add-item/${username}/${amount}/${idBook}`;
    return axiosClient.post(requestUrl);
  },

  removeCartItem: ( idCartItem) => {
    const requestUrl = `http://localhost:8080/api/carts/${idCartItem}`;
    return axiosClient.delete(requestUrl)
  }
};

export default cartApi;
