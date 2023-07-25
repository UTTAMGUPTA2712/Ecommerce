import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { ItemCountButton } from '../Products/User/ItemCountButton';
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/slice/cartSlice';
import { setMessage } from '../../redux/slice/messageSlice';
import { ItemRomoved } from '../../data/constants';
export const CartItemCard = ({ data, value }) => {
    const dispatch = useDispatch()
    const handleRemoveItem = () => {
        dispatch(removeItem(data?._id))
        dispatch(setMessage(ItemRomoved))
    }
    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem sx={{}} alignItems="flex-start" >
                <div className='listitemdiv'>
                    <div className='cartmedia'>
                        <div className='cartitempic' style={{ backgroundImage: `url('${data?.image?.[0]}')` }} />
                        <div className='btn'>
                            <ItemCountButton value={value} data={data} />
                        </div>
                    </div>
                    <div className='data'>
                        <h1>{data?.name}</h1>
                        <h2>₹ {data?.price}/-</h2>
                    </div>
                    <div className='data'>
                        <span>
                            <Typography variant='h6'>Seller Detail</Typography>
                            <Typography variant=''>{data?.sender}</Typography>
                        </span>
                        <Button variant='error' onClick={handleRemoveItem}>Remove</Button>
                    </div>
                </div>
            </ListItem>
        </>
    )
}