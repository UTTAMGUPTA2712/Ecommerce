import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemCard } from '../Products/User/ItemCard'
import { Box, Skeleton } from '@mui/material'
import { GetItemService } from '../../services/Product/GetItemService'
import { setProduct } from '../../redux/slice/productSlice'
import noproduct from "../../assets/Images/noProduct.png"
import { admin, deletedProduct, published } from '../../data/constants'
const noData =
    <Box sx={{ width: "15rem", height: "23rem" }}>
        <Skeleton variant="rectangular" width={"15rem"} height={"15rem"} />
        <Box sx={{ pt: 0.5 }}>
            <Skeleton width="70%" height={"3rem"} />
            <Skeleton width="40%" height={"2rem"} />
            <Skeleton width="100%" height={"3rem"} />
        </Box>
    </Box>
const ItemList = ({ userdata = "", itemsType = "" }) => {
    const dispatch = useDispatch()
    const [productLists, setProductLists] = useState(null)
    const user = useSelector(state => state.user.user)
    const filter = useSelector(state => state.filter.filter)
    const cart = useSelector(state => state.cart.cart)
    const productList = productLists?.filter(product => { return (itemsType !== "") ? (product?.status === itemsType) : ((product?.sender === deletedProduct) ? "" : ((product?.status === published) || (userdata === "") || (product?.sender === userdata?.email) || (user?.title === admin))) })
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
    }, [])
    useEffect(() => {
        list = productLists?.filter((product) => product?.category===filter?.category&&product?.name?.includes(filter?.search) && product?.price <= filter?.upperLimit && filter?.lowerLimit >= product?.price)
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
        console.log(list);
    }, [filter])
    return (
        <>
            <div id='itemList'>
                {productList?.length === 0 ?
                    <div className='centerimage' style={{ backgroundImage: `url('${noproduct}')` }} />
                    :
                    !productLists ?
                        <>
                            {Array(8).fill().map((_, index) => (
                                <React.Fragment key={index}>
                                    {noData}
                                </React.Fragment>
                            ))}
                        </>
                        :
                        productList?.map((product) => {
                            return <ItemCard data={product} value={cart?.[product?._id]?.value} />
                        })
                }
            </div>
        </>
    )
}
export default ItemList