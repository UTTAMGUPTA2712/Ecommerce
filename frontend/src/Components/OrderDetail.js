import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddressSelector } from './AddresSelector'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const OrderDetail = ({ placeOrder }) => {
  const cart = useSelector(state => state.cart.cart)
  const [data, setdata] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    let sum = 0;
    let items = 0;
    for (let item in cart) {
      items = +items + +cart[item]?.value
      let val = cart[item]?.value * +(cart[item]?.price)
      if (val) {
        sum = +sum + +val
      }
    }
    setdata({ items: items, total: sum })
  }, [cart])
  return (
    <>
      <div id='checkOut'>
        {/* <AddressSelector/> */}
        <table>
          <tr>
            <td>Total items:</td>
            <td>{data?.items}</td>
          </tr>
          <tr>
            <td>Gross Amount:</td>
            <td>₨. {(data?.total) * 82 / 100}/- </td>
          </tr>
          <tr>
            <td>Tax Amount:</td>
            <td>₨. {(data?.total) * 18 / 100}/- </td>
          </tr>
          <tr>
            <td>Grand Total:</td>
            <td>₨. {data?.total}/-</td>
          </tr>
        </table>
        {!placeOrder && <Button variant='contained' onClick={() => navigate("/checkout")} fullWidth>Check Out</Button>}

      </div>
    </>
  )
}

export default OrderDetail