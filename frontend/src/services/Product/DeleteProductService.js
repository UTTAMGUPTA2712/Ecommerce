
import axios from 'axios'
import { server, serverError } from '../../data/constants'

export const DeleteProductService = (data) => {
  try {
    const response = axios.post(server + "product/deleteproduct", data)
    return response;

  } catch (error) {
    //console.log(error);
    return serverError
  }
}