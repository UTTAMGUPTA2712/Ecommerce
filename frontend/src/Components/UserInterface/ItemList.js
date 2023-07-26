import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ItemCard } from '../Products/User/ItemCard'
import { Box, Skeleton } from '@mui/material'
import { GetItemService } from '../../services/Product/GetItemService'
import { setProduct } from '../../redux/slice/productSlice'
import noproduct from "../../assets/Images/noProduct.png"
import { deletedProduct, published, serverError } from '../../data/constants'
import { setMessage } from '../../redux/slice/messageSlice'
const noData =
    <Box sx={{ width: "15rem", height: "23rem" }}>
        <Skeleton variant="rectangular" width={"15rem"} height={"15rem"} />
        <Box sx={{ pt: 0.5 }}>
            <Skeleton width="70%" height={"3rem"} />
            <Skeleton width="40%" height={"2rem"} />
            <Skeleton width="100%" height={"3rem"} />
        </Box>
    </Box>
const ItemList = ({ userdata = "nouser", itemsType = "notype" }) => {
    const reduxData = useSelector(state => state.product.product)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [productLists, setProductLists] = useState(reduxData)
    // const user = useSelector(state => state.user.user)
    const filter = useSelector(state => state.filter.filter)
    const cart = useSelector(state => state.cart.cart)
    // to filter where i am using this component
    const FilteredData = (listData) => {
        if (listData) {
            if (userdata !== "nouser" && itemsType !== "notype") {
                const data = listData?.filter(product => (product?.sender === userdata?.email) && (itemsType === "" || product?.status === itemsType))
                const neededData = handleFilter(data)
                return neededData
            } else if (userdata !== "nouser") {
                // console.log(listData);
                const data = listData?.filter(product => (product?.status === published) && (product?.sender === userdata?.email))
                return data
            } else if (itemsType !== "notype") {
                const data = listData?.filter(product => itemsType === "" || product?.status === itemsType)
                return data
            } else {
                const data = listData?.filter(product => (product?.sender !== deletedProduct) && (product?.status === published))
                const neededData = handleFilter(data)
                return neededData
            }
        }
    }
    // to handle filter
    const handleFilter = (data) => {
        let list = data?.filter((product) => (filter?.category === "" || product?.category === filter?.category) && (filter?.search === "" || product?.name?.includes(filter?.search)) && ((product?.price <= filter?.upperLimit) && (filter?.lowerLimit <= product?.price) && (filter?.rating <= product?.rate || product?.rate === 0)))
        switch (filter.sorting) {
            case "price":
                list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "priceRev":
                list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            case "latest":
                list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "latestRev":
                list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "bestSeller":
                list.sort((a, b) => b.purchaseCount - a.purchaseCount);
                break;
            default:
                break;
        }
        return list;
    }
    // to filter data everytime the filter changes
    useEffect(() => {
        const list = FilteredData(reduxData ?? [])
        setProductLists(list)
    }, [filter, userdata, itemsType])
    // set latest data in redux
    useEffect(() => {
        if (loading) {
            setLoading(true)
            const getProducts = async () => {
                try {
                    const response = await GetItemService()
                    if (response.data === serverError) {
                        dispatch(setMessage(serverError))
                    } else {
                        const list = FilteredData(response.data ?? [])
                        setProductLists(list)
                        dispatch(setProduct(response.data))
                    }
                } catch (error) {
                    dispatch(setMessage(serverError))
                }
            }
            getProducts()
            setLoading(false)
            // if()
        }
    }, [])

    return (
        <>
            <div id='itemList'>
                {
                    loading ?
                        <>
                            {Array(8).fill().map((_, index) => (
                                <React.Fragment key={index}>
                                    {noData}
                                </React.Fragment>
                            ))}
                        </>
                        :
                        (productLists?.length === 0 ?
                            <div className='centerimage' style={{ backgroundImage: `url('${noproduct}')` }} />
                            :
                            productLists?.map((product,index) => {
                                return <React.Fragment key={index}><ItemCard data={product} value={cart?.[product?._id]?.value} /></React.Fragment>
                            })
                        )
                }
            </div>
        </>
    )
}
export default ItemList