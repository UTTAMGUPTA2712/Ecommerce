import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUserOrdersService } from '../services/User/GetUserOrdersService'
import OrderComponent from '../Components/Orders/OrderComponent'
import { setMessage } from '../redux/slice/messageSlice'
import { serverError } from '../data/constants'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  const [orders, setOrder] = useState([])
  const dispatch=useDispatch()
  const getOrders = async () => {
    try {
      const response = await GetUserOrdersService(user?.orders)
      setOrder(response.data)
    } catch (err) {
      console.log("err", err);
       dispatch(setMessage(serverError)) 
      
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <OrderComponent orders={orders} />
    </>
  )
}

export default UserOrder