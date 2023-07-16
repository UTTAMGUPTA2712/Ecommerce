import axios from 'axios'
import { serverError } from '../data/constants'
export const GetUserOrdersService = (data) => {
  try{
  return axios.post("http://localhost:1000/order/orders",data)
} catch (error) {
  console.log(error);
  return serverError
}
}
