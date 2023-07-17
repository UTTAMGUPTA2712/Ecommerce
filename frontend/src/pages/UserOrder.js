import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchAppBar from '../utils/SearchAppBar'
import { GetUserOrdersService } from '../services/User/GetUserOrdersService'
import OrderDetail from '../Components/OrderDetail'
import OrderLocation from '../Components/OrderLocation'
import { SetOrderStatusService } from '../services/Order/SetOrderStatusService'
import { serverError } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
import OrderComponent from '../Components/OrderComponent'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  const [orders, setOrder] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await GetUserOrdersService(user?.orders)
        console.log("here", response);
        setOrder(response.data)
      } catch (err) {
        console.log("err", err);
      }
    }
    getOrders()
  }, [])
  return (
    <>
      <OrderComponent orders={orders} />
    </>
  )
}

export default UserOrder