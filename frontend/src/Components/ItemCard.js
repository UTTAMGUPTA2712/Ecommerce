
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
export const ItemCard = ({ data, value }) => {
    const dispatch=useDispatch()
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {data?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {data?.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {value == 0 ? (
                        <Button disabled={data?.published == false} className="addbtn" onClick={() => { dispatch({id:data?._id,value:1}) }}>
                            ADD ITEM +
                        </Button>
                    ) : (
                        <>
                            <Button className="decrement" onClick={() => { dispatch({id:data?._id,value:value-1}) }}>-</Button>
                            <span>{count}</span>
                            <Button className="increment" onClick={() => { dispatch({id:data?._id,value:value+1}) }}>+</Button>
                        </>
                    )}
                </CardActions>
            </Card>
        </>
    );
}
