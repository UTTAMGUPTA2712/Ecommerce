import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const PlaceOrderService = (data) => {
  try {
    const response = axios.post(server + "order/placeorder", data)
    return response;

  } catch (error) {
    //console.log(error);
    return serverError
  }
}
