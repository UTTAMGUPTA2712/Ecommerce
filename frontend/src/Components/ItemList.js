import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemCard } from './ItemCard'
import { Box, Skeleton } from '@mui/material'
import { GetItemService } from '../services/GetItemService'
import { setProduct } from '../redux/slice/productSlice'
const noData =
    <Box sx={{ width: "15rem", height: "23rem" }}>
        <Skeleton variant="rectangular" width={"15rem"} height={"15rem"} />
        <Box sx={{ pt: 0.5 }}>
            <Skeleton width="70%" height={"3rem"} />
            <Skeleton width="40%" height={"2rem"} />
            <Skeleton width="100%" height={"3rem"} />
        </Box>
    </Box>
const ItemList = () => {
    const productList = useSelector(state => state.product.product)
    const dispatch = useDispatch()
    const [productLists, setProductLists] = useState(null)
    const user = useSelector(state => state.user.user)
    const filter = useSelector(state => state.filter.filter)
    const cart = useSelector(state => state.cart.cart)
    let list;
    useEffect(() => {
        if (!productLists) {
            const getProducts = async () => {
                const response = await GetItemService()
                setProductLists(response.data)
                dispatch(setProduct(response.data))
            }
            getProducts()
        }
        list = productLists?.filter((product) => product?.name?.includes(filter?.search) && product?.price >= filter?.upperLimit && filter?.lowerLimit <= product?.price)
        switch (filter?.sorting) {
            case "price":
                list = list.sort((a, b) => a.price > b.price)
                break;
            case "priceRev":
                list = list.sort((a, b) => a.price < b.price)
                break;
            case "rate":
                list = list.sort((a, b) => a.rate > b.rate)
                break;
            case "rateRev":
                list = list.sort((a, b) => a.rate < b.rate)
                break;
        }
    }, [filter])
    return (
        <>
            <div id='itemList'>
                {productLists?.length === 0 ? "" :
                    !productLists ?
                        <>
                            {Array(8).fill().map((_, index) => (
                                <React.Fragment key={index}>
                                    {noData}
                                </React.Fragment>
                            ))}
                        </>
                        :
                        productLists?.map((product) => {
                            return (user?._id !== product?.user) && <ItemCard data={product} value={cart?.[product?._id]?.value} />
                        })}
            </div>
        </>
    )
}
export default ItemList