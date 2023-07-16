import axios from 'axios'
import { serverError } from '../data/constants'
export const AddUser = (user) => {
  try{
  return axios.post("http://localhost:1000/auth/Signup",user)
} catch (error) {
  console.log(error);
  return serverError
}
}
