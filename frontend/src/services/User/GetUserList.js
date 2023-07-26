import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetUserList = () => {
  try {
    const response = axios.get(server + "user/getAllUser")
    return response;

  } catch (error) {
    //console.log(error);
    return serverError
  }
}