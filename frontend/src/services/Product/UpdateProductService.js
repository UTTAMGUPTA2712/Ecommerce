import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const UpdateProductService = (data) => {
  try {
    const response = axios.post(server + "product/updateproduct", data)
    return response;
  } catch (error) {
    console.log(error);
    return serverError
  }
}