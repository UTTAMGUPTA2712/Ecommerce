import axios from 'axios'
import { serverError } from '../data/constants'
export const SetOrderStatusService = (data) => {
  try{
  return axios.post("http://localhost:1000/order/orderstatus",data)
} catch (error) {
  console.log(error);
  return serverError
}
}
