import { Input, TextField } from '@mui/material'
import React, { useState } from 'react'
import { GetCoupon } from '../../services/Coupon/GetCoupon'

export const CouponComponent = ({ changeCoupon }) => {
    const [coupon,setCoupon]=useState()
    const getDate=async()=>{
        const response=await GetCoupon()   
    }
    return (
        <TextField value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
    )
}
