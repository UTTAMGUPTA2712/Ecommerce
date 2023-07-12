import React from 'react'
import { useDispatch } from 'react-redux'
import { savecart } from '../redux/slice/cartSlice'
import { Button } from '@mui/material'

export const ItemCountButton = ({ value,data }) => {
    const dispatch=useDispatch()
    return (
        <>
            {value > 0 ? (
                <>
                    <Button className="decrement" onClick={() => { dispatch(savecart({ id: data?._id, value: value - 1 })) }}>-</Button>
                    <span>{value}</span>
                    <Button className="increment" onClick={() => { dispatch(savecart({ id: data?._id, value: value + 1 })) }}>+</Button>
                </>
            ) : (
                <Button fullWidth={true} className="addbtn" onClick={() => { dispatch(savecart({ id: data?._id, value: 1 })) }}>
                    ADD ITEM +
                </Button>
            )}
        </>
    )
}