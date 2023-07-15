import axios from 'axios'
export const SetOrderStatusService = (data) => {
  return axios.post("http://localhost:1000/orderstatus",data)
}
