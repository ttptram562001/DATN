import axios from "axios";
import queryString from "query-string";
import { LOCAL_STORAGE_ACCESS_TOKEN_NAME } from "../contexts/constants";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "content-type": "application/json",
    Authorization: `access-token ${localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
