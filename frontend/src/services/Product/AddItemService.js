import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const AddItemService = (user) => {
  try {
    const response = axios.post(server+"product/additem", user)
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}
