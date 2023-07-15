import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SearchAppBar from '../Components/SearchAppBar'
import { GetAllOrdersService } from '../services/GetAllOrdersService'
import OrderLocation from '../Components/OrderLocation'
import OrderDetail from '../Components/OrderDetail'

const AllOrder = () => {
    const [orders, setOrder] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await GetAllOrdersService()
                setOrder(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        getOrders()
    }, [])
    return (
        <>
      <div id='order'>
      <SearchAppBar />
      <div style={{display:"flex",overflowY:"auto" ,width:"100vw" ,flexDirection:"column",alignItems:"center"}}>
        {
          orders.map((order, index) => {
            return <React.Fragment key={index}>
              <div id='orderGrid'>
                <OrderLocation />
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

export default AllOrder