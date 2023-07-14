import axios from 'axios'

export const GetUserList = () => {
  return axios.get("http://localhost:1000/getAllUser")
}