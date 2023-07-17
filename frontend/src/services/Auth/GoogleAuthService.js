import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GoogleAuthService = (data) => {
  try {
    const response = axios.post(server+"auth/Google", data)
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}