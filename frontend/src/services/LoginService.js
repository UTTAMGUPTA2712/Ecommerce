import axios from 'axios'

export const LoginService = (user) => {
  return axios.post("http://localhost:1000/auth/Login",user)
}
