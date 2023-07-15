import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchAppBar from '../Components/SearchAppBar'
import { GetUserOrdersService } from '../services/GetUserOrdersService'
import OrderDetail from '../Components/OrderDetail'
import OrderLocation from '../Components/OrderLocation'
import { SetOrderStatusService } from '../services/SetOrderStatusService'
import { serverError } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  const [orders, setOrder] = useState([])
  const dispatch = useDispatch()
  const setStatus = async ( data ) => {
    const response = await SetOrderStatusService(data)
    if (response === serverError) {
      dispatch(setMessage({ message: "Server Is Down Please Try Again After some time", severity: "error" }))
    } else {
      dispatch(setMessage({ message: "Successfully set", severity: "success" }))
    }
  }
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
  }, [setStatus])
  return (
    <>
      <div id='order'>
        <SearchAppBar />
        <div style={{ display: "flex", overflowY: "auto", width: "100vw", flexDirection: "column", alignItems: "center" }}>
          {
            orders.map((order, index) => {
              return <React.Fragment key={index}>
                <div id='orderGrid'>
                  <OrderLocation data={order.status} id={order._id} setStatus={setStatus} />
                  <OrderDetail cart={order.items} />
                </div>
              </React.Fragment>
            })
          }
        </div>
      </div>
    </>
  )
}

export default UserOrder