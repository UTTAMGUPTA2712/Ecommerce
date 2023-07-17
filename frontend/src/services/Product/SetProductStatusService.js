import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const SetProductStatusService = (data) => {
  try{
  const response = axios.post(server+"product/productstatus", data)
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}