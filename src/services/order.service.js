import axios from "axios";
export const baseURL = import.meta.env.VITE_BASE_API_URL + "api/";

const OrderService = {
  async getOrder(orderId) {
    return axios
      .get(baseURL + `order/findById/${orderId}`)
      .then((res) => res.data);
  },
};

export default OrderService;
