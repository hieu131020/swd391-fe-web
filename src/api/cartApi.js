import axiosClient from "./axiosClient";

const cartApi = {
  getCart: (id) => {
    const url = `/carts/${id}`;
    return axiosClient.get(url);
  },
  updateCart: (id, params) => {
    const url = `/carts/${id}`;
    return axiosClient.put(url, params);
  },
  deleteCart: (id) => {
    const url = `/carts/${id}`;
    return axiosClient.delete(url);
  },
  addToCart: (id, idP) => {
    const url = `/carts/?idAccount=${id}&idProduct=${idP}&quantity=1`;
    return axiosClient.post(url);
  },
};
export default cartApi;
