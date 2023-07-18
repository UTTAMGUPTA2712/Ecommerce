import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setMessage } from '../../redux/slice/messageSlice'
import { saveAnAddress } from '../../data/constants'

export const GrossDetail = () => {
    const cart = useSelector(state => state.cart.cart)
    const [data, setdata] = useState(0)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const address = useSelector(state => state.user.address)
    const handleClick = () => {
        if (address === undefined) {
            navigate("/profile")
            dispatch(setMessage(saveAnAddress))
        } else {
            navigate("/checkout")
        }
    }
    useEffect(() => {
        let sum = 0;
        for (let item in cart) {
            let val = cart[item]?.value * +(cart[item]?.data?.price)
            if (val) {
                sum = +sum + +val
            }
        }
        setdata(sum)
    }, [cart])
    return (
        <>
            <div id='checkOut'>
                <table>
                    <tr>
                        <td>Total items:</td>
                        <td>{cart?.length}</td>
                    </tr>
                    <tr>
                        <td>Gross Amount:</td>
                        <td>₹ {(data) * 82 / 100}/- </td>
                    </tr>
                    <tr>
                        <td>Tax Amount:</td>
                        <td>₹ {(data) * 18 / 100}/- </td>
                    </tr>
                    <tr>
                        <td>Grand Total:</td>
                        <td>₹ {data}/-</td>
                    </tr>
                </table>
                <Button disabled={data===0} variant='contained' onClick={handleClick} fullWidth>Check Out</Button>
            </div>
        </>
    )
}