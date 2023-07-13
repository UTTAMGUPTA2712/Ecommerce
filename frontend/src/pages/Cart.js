import { Divider, List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { CartItemCard } from '../Components/CartItemCard'
import SearchAppBar from '../Components/SearchAppBar'
import CheckOut from '../Components/CheckOut'

const Cart = () => {
  const cart = useSelector(state => state.cart.cart)
  const product = useSelector(state => state.product.product)
  return (
    <>
      <div id='cart'>
        <SearchAppBar />
        <List sx={{margin:"0 3rem"}}>
          {product.map(item => { return (cart[item._id]?.value>0)&&<CartItemCard data={item} value={cart[item._id]?.value}/> })}
          <Divider variant="inset" component="li" />
        </List>
        <div/>
        <CheckOut/>
      </div>
    </>
  )
}
export default Cart