import axios from 'axios'
import { serverError } from '../data/constants'
export const GetAllOrdersService = () => {
  try {
    return axios.get("http://localhost:1000/order/orders")
  } catch (error) {
    console.log(error);
    return serverError
  }
}
