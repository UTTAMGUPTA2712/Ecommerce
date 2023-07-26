import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ItemCountButton } from '../Components/Products/User/ItemCountButton'
import SearchAppBar from '../Components/UserInterface/SearchAppBar'
import { useSelector } from 'react-redux'
import SuggestionList from '../Components/Products/User/SuggestionList'
import { BuyNowButton } from '../Components/Products/User/BuyNowButton'
import AddItems from '../Components/Products/Vendor/AddItem'
import { StatusButton } from '../Components/Products/Vendor/StatusButton'
import { Rating } from '@mui/material'
import { RatingComponent } from '../Components/Products/User/RatingComponent'
import { admin } from '../data/constants'
const ProductDetail = () => {
    const productList = useSelector(state => state.product.product)
    const cart = useSelector(state => state.cart.cart)
    const location = useLocation()
    const user = useSelector(state => state.user.user)
    const data = location.state
    const [product, setProduct] = useState(data)
    const [pic, setPic] = useState()
    useEffect(() => {
        const file = document.getElementById("productSpecs")
        file.scroll({ top: 0, left: 0, behavior: "smooth", });
    }, [location])
    useEffect(() => {
        for (let item of productList) {
            if (item._id === data?._id) {
                setProduct(item)
                setPic(item?.image?.[0])
            }
        }
    }, [productList, location])
    return (
        <>
            <div id='productdetail'>
                <SearchAppBar />
                <div id='usercarousal'>
                    <div style={{ backgroundImage: `url('${pic}')`, backgroundColor: "#f0f0f0" }} className='mainpic' />
                    {product?.image?.map((photo, index) => {
                        return <div key={index} className='thumbpic' onMouseOver={() => setPic(photo)} style={{ gridColumn: index + 2, backgroundImage: `url('${photo}')`, backgroundColor: "#f0f0f0" }} />
                    }
                    )}
                </div>
                <div id='productSpecs'>
                    {(user?.email === product?.sender || user?.title === admin) &&
                        <div>
                            <AddItems itemData={product} />
                            <StatusButton id={product?._id} status={product?.status} />
                        </div>
                    }
                    <div id='specsCard' style={{ backgroundColor: "white", textAlign: "left", marginTop: "1rem" }}>
                        <div style={{ margin: "2rem" }}>
                            <h1 style={{ margin: 0 }}>{product?.name}<Rating size="small" value={product?.rate} readOnly /></h1>
                            <p>{product?.category}</p>
                            <h1 style={{ margin: "2rem 0" }}>₹ {product?.price}</h1>
                            <h2>Specification</h2>
                            <p>{product?.description}</p>
                            <h2>Dealer Detail</h2>
                            <p>{product?.sender}</p>
                            <h1 style={{ textAlign: "center", fontSize: "2rem" }}><ItemCountButton value={cart[product?._id]?.value} data={product} /></h1>
                            <BuyNowButton value={cart[product?._id]?.value} data={product} />
                        </div>
                    </div>
                    <SuggestionList id={product?._id} data={product?.category} />
                    <RatingComponent data={product} />
                </div>
            </div>
        </>
    )
}

export default ProductDetail