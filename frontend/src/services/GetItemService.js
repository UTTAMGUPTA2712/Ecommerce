import axios from 'axios'
export const GetItemService = () => {
  return axios.get("http://localhost:1000/product")
}
