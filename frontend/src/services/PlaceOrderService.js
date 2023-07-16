import axios from 'axios'
import { serverError } from '../data/constants'
export const PlaceOrderService = (data) => {
  try{
  return axios.post("http://localhost:1000/order/placeorder",data)
} catch (error) {
  console.log(error);
  return serverError
}
}
