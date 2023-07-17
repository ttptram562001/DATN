import axiosClient from "./axiosClient";
import { url } from "./constants";

const addressApi = {
  getProvinces: () => {
    const requestUrl = url + "/api/provinces";
    return axiosClient.get(requestUrl);
  },

  getAddress: (idProvince, idDistrict, idWard) => {
    const requestUrl = url + "/api/provinces/get-address";
    return axiosClient.get(requestUrl, {
      params: {
        idProvince: idProvince,
        idDistrict: idDistrict,
        idWard: idWard,
      },
    });
  },

  addAddressForAccount: (
    idAccount,
    name,
    phone,
    detailAddress,
    address,
    idAddressType,
    defaultAddress
  ) => {
    const requestUrl = url + `/api/addresses/${idAccount}`;
    return axiosClient.post(requestUrl, {
      name,
      phone,
      detailAddress,
      address,
      idAddressType,
      defaultAddress,
    });
  },
};

export default addressApi;
