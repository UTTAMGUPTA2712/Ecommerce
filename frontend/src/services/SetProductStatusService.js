import axios from 'axios'
import { serverError } from '../data/constants'
export const SetProductStatusService = (data) => {
  try{
  return axios.post("http://localhost:1000/product/productstatus", data)
} catch (error) {
  console.log(error);
  return serverError
}
}