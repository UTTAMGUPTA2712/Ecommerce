import axios from 'axios'

export const AddUser = (user) => {
  return axios.post("http://localhost:1000/Signup",user)
}
