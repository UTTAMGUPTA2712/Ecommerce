import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setMessage } from '../../../redux/slice/messageSlice'
import { savecart } from '../../../redux/slice/cartSlice'
import { outOfStock } from '../../../data/constants'
export const BuyNowButton = ({ data, value }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const address = useSelector(state => state.user.address)
    const user = useSelector(state => state.user.user?.email)
    // console.log(address);
    const itemData = {
        price: data?.price,
        name: data?.name,
        image: data?.image?.[0]
    }
    const handleClick = () => {
        if (address === undefined) {
            navigate("/profile", { state: "goback" })
            dispatch(setMessage({ message: "Please Save An Address", severity: "info" }))
        } else {
            navigate("/checkout")
        }
        dispatch(savecart({ id: data?._id, data: itemData, value: value > 0 ? value : 1 }))
    }
    return (
        <>
            {data?.status !== outOfStock && data?.sender !== user && <Button fullWidth onClick={handleClick} sx={{ backgroundColor: "#0f0f0f", color: "tomato", height: "3rem", fontSize: "1.5rem" }}>{value > 0 ? "GO TO CART" : "BUY NOW"}</Button>}
        </>
    )
}
