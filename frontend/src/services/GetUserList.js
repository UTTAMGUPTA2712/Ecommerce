import axios from 'axios'
import { serverError } from '../data/constants'
export const GetUserList = () => {
  try{
  return axios.get("http://localhost:1000/user/getAllUser")
} catch (error) {
  console.log(error);
  return serverError
}
}