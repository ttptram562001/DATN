import axiosClient from "./axiosClient";
import { url } from "./constants";

const accountApi = {
    getUser: () => {
        const requestUrl = url + "/user/get-user";
        return axiosClient.get(requestUrl);
    },

    getAccountByUsername: (username) => {
        const requestUrl = url + "/api/accounts/by-username";
        return axiosClient.get(requestUrl, {params: {username: username}})
    }
} 

export default accountApi;