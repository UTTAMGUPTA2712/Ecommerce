import { List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { CartItemCard } from '../Components/CartItemCard'

const Cart = () => {
    const cart=useSelector(state=>state.cart.cart)
  return (
    <>
    <div>
    <List>
      {cart.map(item=>{return <CartItemCard data={item}/>}) }
    </List>
    </div>
    </>
  )
}

export default Cart