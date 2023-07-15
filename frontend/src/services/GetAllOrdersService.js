import axios from 'axios'
export const GetUserOrdersService = () => {
  return axios.get("http://localhost:1000/orders")
}
