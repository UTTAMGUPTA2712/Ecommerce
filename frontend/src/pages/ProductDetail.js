import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ItemCountButton } from '../Components/ItemCountButton'
import SearchAppBar from '../Components/SearchAppBar'
import { useSelector } from 'react-redux'
import SuggestionList from '../Components/SuggestionList'
import { BuyNowButton } from '../Components/BuyNowButton'
const ProductDetail = () => {
    const cart = useSelector(state => state.cart.cart)
    const location = useLocation()
    const data = location.state
    const [pic, setPic] = useState(data?.image?.[0])
    return (
        <>
            <div id='productdetail'>
                <SearchAppBar />
                <div id='usercarousal'>
                    {/* <div style={{backgroundImage:`url${pic}`}} className='mainpic'/> */}
                    <div style={{ backgroundImage: `url('${pic}')` }} className='mainpic' />
                    {data?.image?.map((photo, index) => {
                        return <div className='thumbpic' onClick={() => setPic(photo)} style={{ gridColumn: index + 2, backgroundImage: `url('${photo}')` }} />
                    }
                    )}
                </div>
                <div id='productSpecs'>
                    <div id='specsCard'>
                        <h1>{data?.name}</h1>
                        <h2>₨. {data?.price}/-</h2>
                        <h3>{data?.description}</h3>
                        <ItemCountButton value={cart[data._id]?.value} data={data} />
                        <BuyNowButton value={cart[data._id]?.value} data={data}/>
                    </div>
                    <SuggestionList id={data?._id} data={data?.category} />
                </div>
            </div>
        </>
    )
}

export default ProductDetail