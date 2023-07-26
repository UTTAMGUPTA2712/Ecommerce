import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const LoginService = (user) => {
  try {
    const response = axios.post(server + "auth/Login", user)
    return response;

  } catch (error) {
    //console.log(error);
    return serverError
  }
}
