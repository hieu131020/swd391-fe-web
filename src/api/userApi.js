import axiosClient from "./axiosClient";

const userApi = {
  getUser: (id) => {
    const url = `/informations/${id}`;
    return axiosClient.get(url);
  },
  updateUser: (id, params) => {
    const url = `/informations/${id}`;
    return axiosClient.post(url, params);
  },
  deleteUser: (id) => {
    const url = `/informations/accounts/${id}`;
    return axiosClient.delete(url);
  },
  updatePassWord: (id, params) => {
    const url = `/informations/change_password/${id}`;
    return axiosClient.put(url, params);
  },
};
export default userApi;
