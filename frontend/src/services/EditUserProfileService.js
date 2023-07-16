import axios from 'axios'
import { serverError } from '../data/constants'
export const EditUserProfileService = (data) => {
  try {
    return axios.post("http://localhost:1000/user/editprofile", data)
  } catch (error) {
    console.log(error);
    return serverError
  }
}