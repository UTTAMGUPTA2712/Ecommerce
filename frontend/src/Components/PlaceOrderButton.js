import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlaceOrderService } from '../services/PlaceOrderService';
import { addOrder, saveUser } from '../redux/slice/authSlice';
import { cleancart } from '../redux/slice/cartSlice';
import { setMessage } from '../redux/slice/messageSlice';

const PlaceOrderButton = ({ handleNext }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart.cart)
    console.log(user);
    const [order, setOrder] = useState({})
    const [data, setdata] = useState(0)
    useEffect(() => {
        let sum = 0;
        for (let item in cart) {
            let val = cart[item]?.value * +(cart[item]?.price)
            if (val) {
                sum = +sum + +val
            }
        }
        setdata(sum)
        const orderData = {
            items: cart,
            address: user.address,
            name: user.user.name,
            email: user.user.email,
            price: data,
            orderAt: (new Date()).toLocaleString()
        }
        setOrder(orderData)
    }, [cart])
    const handlePlaceOrder = async () => {
        if (data === 0) {
            dispatch(setMessage({ message: "Cannot place a empty order", severity: "error" }))
        } else {
            const response = await PlaceOrderService(order);
            console.log(response)
            // dispatch(saveUser(response.data.value));
            dispatch(addOrder(response.data))
            dispatch(cleancart());
            dispatch(setMessage({ message: "Order Placed Sucessfully", severity: "success" }));
            handleNext();
        }
    }
    return (
        <Button onClick={handlePlaceOrder}>Place Order</Button>
    )
}

export default PlaceOrderButton