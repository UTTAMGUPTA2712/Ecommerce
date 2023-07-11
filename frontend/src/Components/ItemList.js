import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetItemService } from '../services/GetItemService'
import { setProduct } from '../redux/slice/productSlice'
import { ItemCard } from './ItemCard'

const ItemList = () => {
    const productList = useSelector(state => state.product.product)
    const user = useSelector(state => state.user.user)
    const filter = useSelector(state => state.filter.filter)
    const cart = useSelector(state => state.cart.cart)
    let list;
    useEffect(() => {
        list = productList.filter((product) => product?.name.includes(filter?.search) && product?.rate >= filter?.rate)
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
            {productList.map((product, index) => {
                return (user?._id === product?.user) && <div key={index}><ItemCard data={product} value={cart?.[product?._id]} /></div>
            })}
        </>
    )
}
export default ItemList