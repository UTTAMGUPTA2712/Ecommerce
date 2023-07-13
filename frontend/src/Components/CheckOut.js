import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CheckOut = () => {
  const cart=useSelector(state=>state.cart.cart)
  const [total,setTotal] = useState(0)
  console.log(cart);
  useEffect(()=>{
    let sum=0;
    for(let item in cart) {
      console.log(cart[item]?.value*+(cart[item]?.price));
      let val=cart[item]?.value*+(cart[item]?.price)
      if(val){
      sum= +sum + +val}
    }
    
    setTotal(sum)
  },[cart])
  return (
    <>
      <h1>Grand Total: ₨.{total}/-</h1>
    </>
  )
}

export default CheckOut