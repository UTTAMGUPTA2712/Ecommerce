import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const AddCouponsService = (data) => {
  try {
    const response = axios.post(server + "coupon/addcoupon", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}