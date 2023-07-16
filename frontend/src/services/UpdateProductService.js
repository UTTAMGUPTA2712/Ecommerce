import axios from 'axios'

export const UpdateProductService = (data) => {
  return axios.post("http://localhost:1000/product/updateproduct",data)
}