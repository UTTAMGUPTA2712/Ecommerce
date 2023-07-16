import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchAppBar from '../Components/SearchAppBar'
import { GetUserOrdersService } from '../services/GetUserOrdersService'
import OrderDetail from '../Components/OrderDetail'
import OrderLocation from '../Components/OrderLocation'
import { SetOrderStatusService } from '../services/SetOrderStatusService'
import { serverError } from '../data/constants'
import { setMessage } from '../redux/slice/messageSlice'
import OrderComponent from '../Components/OrderComponent'

const UserOrder = () => {
  const user = useSelector(state => state.user.user)
  const [orders, setOrder] = useState([])
  // const dispatch = useDispatch()
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
      {/* <div id='order'>
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
      </div> */}
      <OrderComponent orders={orders}/>
    </>
  )
}

export default UserOrder