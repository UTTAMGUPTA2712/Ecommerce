import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const AddUser = (user) => {
  try{
  const response = axios.post(server+"auth/Signup",user)
return response; 

} catch (error) {
  console.log(error);
  return serverError
}
}
