import axios from 'axios'
export const SetProductStatusService = (data) => {
  return axios.post("http://localhost:1000/product/productstatus", data)
}