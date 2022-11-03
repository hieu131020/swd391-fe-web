import axiosClient from "./axiosClient";
const registerApi = {
  register: (params) => {
    const url = `/register`;
    return axiosClient.post(url, params);
  },
};
export default registerApi;
