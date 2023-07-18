import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const ReviewProductService = (data) => {
  try{
  const response = axios.post(server+"product/productreview", data)
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}