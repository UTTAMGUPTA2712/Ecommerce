import axios from 'axios'
export const GetUserOrdersService = (data) => {
  return axios.post("http://localhost:1000/orders",data)
}
