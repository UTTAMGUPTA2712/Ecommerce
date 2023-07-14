import axios from 'axios'

export const PlaceOrderService = (data) => {
  return axios.post("http://localhost:1000/placeorder",data)
}
