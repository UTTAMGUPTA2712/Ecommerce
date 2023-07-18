import React, { useEffect, useState } from 'react'
import { GetBestSeller } from '../../services/Product/GetBestSeller'
import { ItemCard } from '../Products/User/ItemCard'
import { useSelector } from 'react-redux'
import { ArrowForward } from '@mui/icons-material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import bestSellerPic from "../../assets/Images/bestSeller.png"
import { useNavigate } from 'react-router-dom'
import arrowpic from "../../assets/Images/arrow.png"
const BestSellerItem = () => {
    const [products, setProducts] = useState([])
    const cart = useSelector(state => state.cart.cart)
    const navigate = useNavigate()
    const getData = async () => {
        const response = await GetBestSeller()
        setProducts(response.data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div id='bestseller' style={{ padding: "1rem", display: "-webkit-box", overflow: "auto hidden", width: "100%-2rem", flexWrap: "nowrap",boxShadow:"rgba(0, 0, 0, 0.56) 0px 12px 30px 1px inset" }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            fullWidth={true}
                            component="img"
                            height="140"
                            image={bestSellerPic}
                        />
                        <CardContent sx={{ margin: "0.7rem" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                BEST SELLING
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                PRODUCT
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <ArrowForward />
                    </CardActions>
                </Card>
                {

                    products.map(product => (
                        <ItemCard data={product} value={cart?.[product?._id]?.value} />
                    ))
                }
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea onClick={() => navigate("/home")}>
                        <CardMedia
                            fullWidth={true}
                            component="img"
                            height="140"
                            image={arrowpic}
                        />
                        <CardContent sx={{ margin: "0.7rem" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                SHOP ALL
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                PRODUCT
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <ArrowForward />
                    </CardActions>
                </Card>
            </div>
        </>
    )
}

export default BestSellerItem