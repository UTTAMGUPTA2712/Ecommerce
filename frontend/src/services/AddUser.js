import axios from 'axios'

export const AddUser = (user) => {
  return axios.post("http://localhost:1000/auth/Signup",user)
}
