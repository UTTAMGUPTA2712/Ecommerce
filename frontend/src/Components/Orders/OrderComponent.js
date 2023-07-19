import React from 'react'
import SearchAppBar from '../../utils/SearchAppBar'
import OrderLocation from './OrderLocation'
import OrderDetail from './OrderDetail'
import noorderpic from "../../assets/Images/noOrder.png"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar } from '@mui/material'

const OrderComponent = ({ orders, setStatus = "user" }) => {
    return (
        <>
            <div id='order'>
                <SearchAppBar />
                {orders?.length === 0 ? <div className='centerimage' style={{ backgroundImage: `url('${noorderpic}')`, gridColumn: "1/span 3" }} /> : <div style={{ display: "flex", overflowY: "auto", width: "100vw", flexDirection: "column", alignItems: "center" }}>
                    {
                        orders.map((order, index) => {
                            return <React.Fragment key={index}>
                                <div id={setStatus !== "user" ? "orderGrid2" : 'orderGrid1'}>
                                    {setStatus !== "user" && <div id='user'>
                                        <TableContainer component={Paper}>
                                            <Table aria-label="spanning table">
                                                <TableBody>
                                                    <TableRow hover>
                                                        <TableCell align="left">
                                                            <Avatar sx={{ height: "5rem", width: "5rem", fontSize: "3rem", margin: "1rem",bgcolor:"#00b0ff" }} src={order?.photo}>{order?.name?.[0].toUpperCase()}</Avatar>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <span style={{ cursor: "pointer" }}>
                                                                <h2>{order?.name}</h2>
                                                                <h3>{order?.email}</h3>
                                                            </span>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <p>Address : {order?.address?.location}</p>
                                                            <p>Location : {order?.address?.city},{order?.address?.state}</p>
                                                            <p>Pincode : {order?.address?.pincode}</p>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <h2>{order?.address?.phone}</h2>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>}
                                    <OrderLocation data={order.status} id={order._id} setStatus={setStatus} />
                                    <OrderDetail cart={order.items} couponData={order?.coupon}/>
                                </div>
                            </React.Fragment>
                        })
                    }
                </div>}
            </div>
        </>
    )
}

export default OrderComponent