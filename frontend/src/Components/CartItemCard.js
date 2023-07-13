import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ItemCountButton } from './ItemCountButton';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/slice/cartSlice';
import { setMessage } from '../redux/slice/messageSlice';
export const CartItemCard = ({ data, value }) => {
    const dispatch = useDispatch()
    const handleRemoveItem=()=>{
        dispatch(removeItem(data?._id))
        dispatch(setMessage({message:"An Item Removed",severity:"info"}))
    }
    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem sx={{}} alignItems="flex-start" >
                <div className='cartmedia'>
                    <div className='cartitempic' style={{ backgroundImage: `url('${data?.image?.[0]}')` }} />
                    <div className='btn'>
                        <ItemCountButton value={value} data={data} />
                    </div>
                </div>
                <ListItemText
                    primary={data?.name}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                ₨. {data?.price}/-
                            </Typography>

                        </>
                    }

                />
                <Button onClick={handleRemoveItem}>Remove</Button>
            </ListItem>
        </>
    )
}
