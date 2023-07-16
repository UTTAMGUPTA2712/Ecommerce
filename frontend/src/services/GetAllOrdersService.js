import axios from 'axios'
export const GetAllOrdersService = () => {
  return axios.get("http://localhost:1000/order/orders")
}
