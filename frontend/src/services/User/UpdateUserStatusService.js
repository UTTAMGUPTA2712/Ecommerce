import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const UpdateUserStatusService = (data) => {
  try {
    const response = axios.post(server + "user/updateuserstatus", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}