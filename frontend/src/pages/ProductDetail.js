import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ItemCountButton } from '../Components/ItemCountButton'
import SearchAppBar from '../Components/SearchAppBar'
import { useSelector } from 'react-redux'
import SuggestionList from '../Components/SuggestionList'
const images = [
    "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043",
    "https://media.istockphoto.com/id/1249579132/photo/beauty-products-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=lDmUkhu7XDdGww_AsQub6jJ55I7WMgAoYrqdopFa-tI=",
    "https://media.istockphoto.com/id/1197832105/vector/male-hand-holding-megaphone-with-new-product-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=INIM5M-N2DZh6pS6DUBSGh7x9ItOBSC3atZOVJtQf7M="
]
const ProductDetail = () => {
    const [pic, setPic] = useState(images[0])
    const location = useLocation()
    const data = location.state
    const cart=useSelector(state=>state.cart.cart)
    return (
        <>
            <div id='productdetail'>
                <SearchAppBar />
                <div id='usercarousal'>
                    {/* <div style={{backgroundImage:`url${pic}`}} className='mainpic'/> */}
                    <img src={pic} className='mainpic' />
                    {images?.map(photo => {
                        return <img onClick={() => setPic(photo)} className='thumbpic' src={photo} />
                    }
                    )}
                </div>
                <div id='productSpecs'>
                    <div id='specsCard'>
                    <h1>{data?.name}</h1>
                    <h2>{data?.price}</h2>
                    <h3>{data?.description}</h3>
                    <ItemCountButton value={cart[data._id]} data={data} />
                    </div>
                    <SuggestionList id={data?._id} data={data?.category}/>
                </div>
            </div>
        </>
    )
}

export default ProductDetail