import axiosClient from "./axiosClient";
import axios from "axios";
import { url } from "./constants";

const bookApi = {
  getTopBook: () => {
    const requestUrl = url + "/api/books/recommend";
    return axiosClient.get(requestUrl);
  },
  getAll: (params) => {
    const requestUrl = "http://localhost:8080/api/books";
    return axiosClient.get(requestUrl, { params });
  },

  get: (id) => {
    const requestUrl = `http://localhost:8080/api/books/${id}`;
    return axiosClient.get(requestUrl);
  },

  getBookType: () => {
    const requestUrl = url + "/api/book-types";
    return axiosClient.get(requestUrl);
  },

  getBookTypeDetailsById: (idBookType) => {
    const requestUrl =
      url + `/api/book-types/get-book-type-detail/${idBookType}`;
    return axiosClient.get(requestUrl);
  },

  createBook: (params) => {
    const requestUrl = url + "/api/books/create-book";
    return axiosClient.post(requestUrl, params);
  },

  updateBook: (idBook, params) => {
    const requestUrl = url + `/api/books/update-book/${idBook}`;
    return axiosClient.post(requestUrl, params);
  },

  activeBook: (idBook) => {
    const requestUrl = url + `/api/books/active-book/${idBook}`;
    return axiosClient.post(requestUrl);
  },

  search: (query) => {
    const requestUrl = url + `/api/books/search`;
    return axiosClient.get(requestUrl, {params: {query: query}});
  },

  getBooksByBookType: (id) => {
    const requestUrl = url + `/api/book-types/${id}`;
    return axios.get(requestUrl);
  },

  getBooksByBookTypeDetail: (id) => {
    const requestUrl = url + `/api/books/book-type-detail/${id}`;
    return axiosClient.get(requestUrl);
  },

  update: (params) => {
    const requestUrl = url + "/api/books";
    return axios.put(requestUrl, params);
  },

  getBook: (slug) => {
    const requestUrl = url + `/books/${slug}`;
    return axiosClient.get(requestUrl);
  },
  getBookList: (id) => {
    const requestUrl = url + `/books/book-type-detail`;
    return axiosClient.get(requestUrl);
  },

  // rate

  rateBook: (idBook, username, amount) => {
    const requestUrl = url + `/api/rates/${idBook}/${username}/${amount}`;
    return axiosClient.post(requestUrl);
  },
  //

  update: (id, credentials) => {
    const requestUrl = url + `/books/${id}`;
    return axiosClient.patch(requestUrl, credentials);
  },
  delete: (id) => {
    const requestUrl = url + `/books/${id}`;
    return axiosClient.delete(requestUrl);
  },
};

export default bookApi;
