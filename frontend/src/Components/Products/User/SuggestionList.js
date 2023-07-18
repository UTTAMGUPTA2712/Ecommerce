import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { published } from '../../../data/constants'

const SuggestionList = ({ data, id }) => {
    const products = useSelector(state => state.product.product)
    const product = products.filter(item => (item?.status === published) && (item?.category === data) && (item._id !== id))
    const navigate = useNavigate()
    if (product.length > 0) return (
        <>
            <h2>Suggestions For You</h2>
            <div id='suggestion'>
                {product.map(item => {
                    return <>
                        <div onClick={() => navigate("/productDetail", { state: item })} className='suggestItem'>
                            <img src={item?.image?.[0]} style={{ height: "6rem", width: "6rem" }} />
                            <h3>{item?.name}</h3>
                            <p>₹ {item?.price}/-</p>
                        </div>
                    </>
                })}
            </div>
        </>
    )
}

export default SuggestionList