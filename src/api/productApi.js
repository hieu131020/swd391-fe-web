import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct: (params) => {
    const url = `/products`;
    return axiosClient.get(url, params);
  },
  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  updateProduct: (id, params) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, params);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  createProduct: (id, params) => {
    const url = `/products/${id}`;
    return axiosClient.post(url, params);
  },
};
export default productApi;
