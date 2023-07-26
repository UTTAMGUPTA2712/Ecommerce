import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const EditUserProfileService = (data) => {
  try {
    const response = axios.post(server + "user/editprofile", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}