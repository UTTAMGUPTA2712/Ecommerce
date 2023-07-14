import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchAppBar from '../Components/SearchAppBar'
import { GetUserOrdersService } from '../services/GetUserOrdersService'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  console.log(user, user.orders);
  const [order, setOrder] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await GetUserOrdersService(user?.orders)
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    getOrders()
  }, [])
  return (
    <>
      <SearchAppBar />
    </>
  )
}

export default UserOrder