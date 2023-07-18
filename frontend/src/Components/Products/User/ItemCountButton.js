import React from 'react'
import { useDispatch } from 'react-redux'
import { savecart } from '../../../redux/slice/cartSlice'
import { Button } from '@mui/material'
import { outOfStock } from '../../../data/constants'

export const ItemCountButton = ({ value, data }) => {
    const dispatch = useDispatch()
    
    const itemData = {
        price: data?.price,
        name: data?.name,
        image: data?.image?.[0]
    }
    return (
        <>
            {data.status === outOfStock ? <Button disabled fullWidth={true} className="addbtn">OUT OF STOCK</Button> :
                (value > 0 ? (
                    <>
                        <Button className="decrement" onClick={() => { dispatch(savecart({ id: data?._id, data: itemData, value: value - 1 })) }}>-</Button>
                        <span>{value}</span>
                        <Button className="increment" onClick={() => { dispatch(savecart({ id: data?._id, data: itemData, value: value + 1 })) }}>+</Button>
                    </>
                ) : (
                    <Button fullWidth={true} className="addbtn" onClick={() => { dispatch(savecart({ id: data?._id, data: itemData, value: 1 })) }}>
                        ADD ITEM +
                    </Button>
                ))}
        </>
    )
}