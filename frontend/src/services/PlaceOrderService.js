import axios from 'axios'

export const PlaceOrderService = (data) => {
  return axios.post("http://localhost:1000/order/placeorder",data)
}
