import axios from 'axios'
import { serverError } from '../data/constants'
export const LoginService = (user) => {
  try{
  return axios.post("http://localhost:1000/auth/Login",user)
} catch (error) {
  console.log(error);
  return serverError
}
}
