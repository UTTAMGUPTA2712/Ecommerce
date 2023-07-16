import axios from 'axios'
import { serverError } from '../data/constants'
export const AddItemService = (user) => {
  try{
  return axios.post("http://localhost:1000/product/additem",user)
} catch (error) {
  console.log(error);
  return serverError
}
}
