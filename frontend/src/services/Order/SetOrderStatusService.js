import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const SetOrderStatusService = (data) => {
  try{
  const response = axios.post(server+"order/orderstatus",data)
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}
