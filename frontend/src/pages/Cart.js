import { Divider, List } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { CartItemCard } from '../Components/Orders/CartItemCard'
import SearchAppBar from '../Components/UserInterface/SearchAppBar'
import { GrossDetail } from '../Components/Orders/GrossDetail'

const Cart = () => {
  const cart = useSelector(state => state.cart.cart)
  const product = useSelector(state => state.product.product)
  // console.log(cart.key);
  return (

    <>
      <div id='cart'>
        <SearchAppBar />
        {Object.keys(cart).length !== 0 ?
          <>
            <div style={{ margin: "2rem", backgroundColor: "white", overflowY: "auto", height: "100%-4rem" }}>
              <List sx={{ margin: "0 3rem" }}>
                {product.map((item, index) => { return (cart[item._id]?.value > 0) && <React.Fragment key={index}><CartItemCard data={item} value={cart[item._id]?.value} /></React.Fragment> })}
                <Divider variant="inset" component="li" />
              </List>
            </div>
            <GrossDetail />
          </>
          :
          <div className='nocartitem' />
        }
      </div>
    </>
  )
}
export default Cart