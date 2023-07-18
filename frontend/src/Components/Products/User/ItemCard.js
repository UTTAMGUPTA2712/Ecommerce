import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { ItemCountButton } from './ItemCountButton';
import { useNavigate } from 'react-router-dom';
export const ItemCard = ({ data, value }) => {
    const navigate = useNavigate()
    return (
        <>
            <Card  sx={{ maxWidth: 345,boxShadow:" rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;"}}>
                <CardActionArea onClick={() => navigate("/productDetail", { state: data })}>
                    <CardMedia
                        fullWidth={true}
                        component="img"
                        height="140"
                        image={data?.image?.[0]}
                        alt={data?.name}
                    />
                    <CardContent sx={{ margin: "0.7rem" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {data?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ₹ {data?.price}/-
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <ItemCountButton value={value} data={data} />
                </CardActions>
            </Card>
        </>
    );
}