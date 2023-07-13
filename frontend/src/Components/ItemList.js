import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import  {ItemCard}  from './ItemCard'

const ItemList = () => {
    const productList = useSelector(state => state.product.product)
    const user = useSelector(state => state.user.user)
    const filter = useSelector(state => state.filter.filter)
    const cart = useSelector(state => state.cart.cart)
    let list;
    console.log(productList);
    useEffect(() => {
        list = productList.filter((product) => product?.name?.includes(filter?.search) && product?.price >= filter?.upperLimit && filter?.lowerLimit<=product?.price)
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
                {productList.map((product) => {
                    return (user?._id !== product?.user) && <ItemCard data={product} value={cart?.[product?._id]?.value} />
                })}
            </div>
        </>
    )
}
export default ItemList