import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const DeleteCarousal = (data) => {
  try {
    const response = axios.post(server + "carousal/deletecarousal", data)
    return response;
  } catch (error) {
    //console.log(error);
    return serverError
  }
}
