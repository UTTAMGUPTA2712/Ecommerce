import axios from 'axios'
export const GetItemService = () => {
  console.log("work");
  return axios.get("http://localhost:1000/product")
}
