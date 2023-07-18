import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GetUserOrdersService } from '../services/User/GetUserOrdersService'
import OrderComponent from '../Components/Orders/User/OrderComponent'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  const [orders, setOrder] = useState([])
  const getOrders = async () => {
    try {
      const response = await GetUserOrdersService(user?.orders)
      setOrder(response.data)
    } catch (err) {
      console.log("err", err);
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