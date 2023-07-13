import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SuggestionList = ({data,id}) => {
    const products=useSelector(state=>state.product.product)
    const navigate=useNavigate()
    return (
        <>
        <h2>Suggestions For You</h2>
        <div id='suggestion'>
            {products.map(product => {
                return (product?.category===data)&&(product._id!==id)&&<>
                    <div onClick={()=>navigate("/productDetail",{state:product})} className='suggestItem'>
                        <img src={product?.image?.[0]} style={{height:"6rem",width:"6rem"}}/>
                        <h3>{product?.name}</h3>
                        <p>₨. {product?.price}/-</p>
                    </div>
                </>
            })}
        </div>
        </>
    )
}

export default SuggestionList