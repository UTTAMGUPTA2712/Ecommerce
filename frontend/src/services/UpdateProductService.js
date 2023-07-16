import axios from 'axios'
import { serverError } from '../data/constants'
export const UpdateProductService = (data) => {
  try{
  return axios.post("http://localhost:1000/product/updateproduct",data)
} catch (error) {
  console.log(error);
  return serverError
}
}