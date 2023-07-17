import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const DeleteCategory = (data) => {
  try {
    const response = axios.post(server+"category/deletecategory", data)
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}
