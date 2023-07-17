import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetAllOrdersService = () => {
  try {
    const response = axios.get(server+"order/orders")
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}
