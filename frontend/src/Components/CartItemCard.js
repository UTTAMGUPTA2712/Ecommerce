import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
export const CartItemCard = ({ data, value }) => {
    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={data?.name}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Sandra Adams
                            </Typography>
                            {data?.description}
                        </React.Fragment>
                    }
                />
                <ListItemButton>
                    {value == 0 ? (
                        <Button disabled={data?.published == false} className="addbtn" onClick={() => { dispatch({ id: data?._id, value: 1 }) }}>
                            ADD ITEM +
                        </Button>
                    ) : (
                        <>
                            <Button className="decrement" onClick={() => { dispatch({ id: data?._id, value: value - 1 }) }}>-</Button>
                            <span>{count}</span>
                            <Button className="increment" onClick={() => { dispatch({ id: data?._id, value: value + 1 }) }}>+</Button>
                        </>
                    )}
                </ListItemButton>
            </ListItem>
        </>
    )
}
