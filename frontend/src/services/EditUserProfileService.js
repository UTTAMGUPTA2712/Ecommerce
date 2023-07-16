import axios from 'axios'

export const EditUserProfileService = (data) => {
  return axios.post("http://localhost:1000/user/editprofile",data)
}