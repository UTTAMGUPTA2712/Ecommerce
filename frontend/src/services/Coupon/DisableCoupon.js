import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const DisableCoupon = (data) => {
  try {
    const response = axios.post(server + "coupon/disablecoupon", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}