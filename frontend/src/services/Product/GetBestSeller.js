import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const GetBestSeller = () => {
  try{
  const response = axios.get(server+"product/bestproduct")
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}
