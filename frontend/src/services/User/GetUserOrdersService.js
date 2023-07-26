import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetUserOrdersService = (data) => {
  try {
    const response = axios.post(server + "order/orders", data)
    return response;

  } catch (error) {
    //console.log(error);
    return serverError
  }
}
