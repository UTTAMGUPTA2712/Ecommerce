import React from 'react'
import SearchAppBar from './SearchAppBar'
import OrderLocation from './OrderLocation'
import OrderDetail from './OrderDetail'
import { UserCard } from './UserCard'

const OrderComponent = ({ orders, setStatus = "user" }) => {

    return (
        <>
            <div id='order'>
                <SearchAppBar />
                <div style={{ display: "flex", overflowY: "auto", width: "100vw", flexDirection: "column", alignItems: "center" }}>
                    {
                        orders.map((order, index) => {
                            return <React.Fragment key={index}>
                                <div id={setStatus !== "user" ? "orderGrid2" : 'orderGrid1'}>
                                    {setStatus !== "user" && <div id='user'><UserCard data={{ name: order.name, email: order.email }} /></div>}
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

export default OrderComponent