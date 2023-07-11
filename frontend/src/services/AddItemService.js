import axios from 'axios'

export const AddItemService = (user) => {
  return axios.post("http://localhost:1000/additem",user)
}
