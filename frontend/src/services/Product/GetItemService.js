import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetItemService = () => {
  try{
  console.log("work");
  const response = axios.get(server+"product/product")
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}
