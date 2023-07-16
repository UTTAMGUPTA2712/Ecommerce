import axios from 'axios'
import { serverError } from '../data/constants'
export const GetItemService = () => {
  try{
  console.log("work");
  return axios.get("http://localhost:1000/product/product")
} catch (error) {
  console.log(error);
  return serverError
}
}
