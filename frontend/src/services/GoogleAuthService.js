import axios from 'axios'
import { serverError } from '../data/constants'
export const GoogleAuthService = (data) => {
  try {
    return axios.post("http://localhost:1000/auth/Google", data)
  } catch (error) {
    return serverError
  }
}