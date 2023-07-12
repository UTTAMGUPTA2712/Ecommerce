import { Divider, List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { CartItemCard } from '../Components/CartItemCard'
import SearchAppBar from '../Components/SearchAppBar'

const Cart = () => {
  const cart = useSelector(state => state.cart.cart)
  const product = useSelector(state => state.product.product)
  return (
    <>
      <div id='cart'>
        <SearchAppBar />
        <List >
          {product.map(item => { return (cart[item._id]>0)&&<CartItemCard data={item} value={cart[item._id]}/> })}
          <Divider variant="inset" component="li" />
        </List>
        <div/>
      </div>
    </>
  )
}
export default Cart