import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const AddCategory = (data) => {
  try {
    const response = axios.post(server + "category/addcategory", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}