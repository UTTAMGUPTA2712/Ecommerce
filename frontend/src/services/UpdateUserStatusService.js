import axios from 'axios'
import { serverError } from '../data/constants'
export const UpdateUserStatusService = (data) => {
  try {
    return axios.post("http://localhost:1000/user/updateuserstatus", data)
  } catch (error) {
    console.log(error);
    return serverError
  }
}
