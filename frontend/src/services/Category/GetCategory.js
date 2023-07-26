import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetCategory = () => {
  try {
    const response = axios.get(server + "category/getcategory")
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}