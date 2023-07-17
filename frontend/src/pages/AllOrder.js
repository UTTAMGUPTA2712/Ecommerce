import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchAppBar from '../utils/SearchAppBar'
import { GetAllOrdersService } from '../services/Order/GetAllOrdersService'
import OrderLocation from '../Components/OrderLocation'
import OrderDetail from '../Components/OrderDetail'
import { setMessage } from '../redux/slice/messageSlice'
import { SetOrderStatusService } from '../services/Order/SetOrderStatusService'
import { serverError } from '../data/constants'
import OrderComponent from '../Components/OrderComponent'

const AllOrder = () => {
  const [orders, setOrder] = useState([])
  const dispatch = useDispatch()

  const setStatus = async (data) => {
    const response = await SetOrderStatusService(data)
    if (response === serverError) {
      dispatch(setMessage({ message: "Server Is Down Please Try Again After some time", severity: "error" }))
    } else {
      getOrders()
      dispatch(setMessage({ message: "Successfully set", severity: "success" }))
    }
  }
  const getOrders = async () => {
    try {
      const response = await GetAllOrdersService()
      setOrder(response.data)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <>
      <OrderComponent orders={orders} setStatus={setStatus} />
    </>
  )
}

export default AllOrder