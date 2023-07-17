import axios from "axios";
import axiosClient from "./axiosClient";
import { url } from "./constants";

const userApi = {
  getUser: () => {
    const requestUrl = url + "/api/users" ;
    return axiosClient.get(requestUrl);
  },
  
  getEmployeeList: () => {
    const requestUrl = url + `/api/users/employee`;
    return axiosClient.get(requestUrl);
  },

  UserToEmployee: (idUser) => {
    const requestUrl = url + `/api/users/update-to-manager/${idUser}`;
    return axiosClient.post(requestUrl);
  },

  EmployeeToUser: (idUser) => {
    const requestUrl = url + `/api/users/update-to-user/${idUser}`;
    return axiosClient.post(requestUrl);
  },

  getUserByUsername: (username) => {
    const requestUrl = url + `/api/users/by-username`;
    return axiosClient.get(requestUrl, {params: {username: username}})
  },

  // getAll: (params) => {
  //   const requestUrl = url + `/user`;
  //   return axiosClient.get(requestUrl, { params });
  // },

  // get: (id) => {
  //   const requestUrl = url + `/user/${id}`;
  //   return axiosClient.get(requestUrl, id);
  // },

  // getUserList: () => {
  //   const requestUrl = url + `/user/get-basic-user`;
  //   return axiosClient.get(requestUrl);
  // },



  // updateUser: (params) => {
  //   const requestUrl = url + `/user/`;
  //   return axiosClient.put(requestUrl, params);
  // },


  
  activeUser: (idUser) => {
    const requestUrl = url + `/api/users/active-user/${idUser}`;
    return axiosClient.post(requestUrl);
  },
};

export default userApi;
