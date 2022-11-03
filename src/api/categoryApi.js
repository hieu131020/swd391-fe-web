import axiosClient from "./axiosClient";

const categoryApi = {
  getAllCategory: () => {
    const url = "/system-categories/getAllCategory";
    return axiosClient.get(url);
  },
  updateCategory: (id, params) => {
    const url = `/system-categories/${id}`;
    return axiosClient.put(url, params);
  },
  deleteCategory: (id) => {
    const url = `/system-categories/${id}`;
    return axiosClient.delete(url);
  },
  createCategory: (params) => {
    const url = `/system-categories`;
    return axiosClient.post(url, params);
  },
};
export default categoryApi;
