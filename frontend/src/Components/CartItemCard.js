import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ItemCountButton } from './ItemCountButton';
import LocalMallIcon from '@mui/icons-material/LocalMall';
export const CartItemCard = ({ data, value }) => {
    return (
        <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" secondaryAction={
                <ItemCountButton value={value} data={data} />
            }>
                <ListItemAvatar>
                    <Avatar alt={data?.name} src={data?.photo} ><LocalMallIcon /></Avatar>
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
                                {data?.description}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </>
    )
}
