import axios from 'axios'
import { server, serverError } from '../../data/constants'
export const CreateBannerService = (data) => {
  try {
    const response = axios.post(server+"carousal/createcarousal", data)
return response; 
 } catch (error) {
    console.log(error);
    return serverError
  }
}