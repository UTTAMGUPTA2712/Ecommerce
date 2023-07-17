import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetCoupon = () => {
  try {
    const response = axios.get(server+"coupon/getcoupon")
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}