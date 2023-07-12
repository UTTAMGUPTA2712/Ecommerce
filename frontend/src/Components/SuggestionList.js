import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SuggestionList = ({data,id}) => {
    const products=useSelector(state=>state.product.product)
    const navigate=useNavigate()
    return (
        <>
        <div id='suggestion'>
            {products.map(product => {
                return (product?.category===data)&&(product._id!==id)&&<>
                    <div onClick={()=>navigate("/productDetail",{state:product})} className='suggestItem'>
                        <div style={{backgroundImage:`url(${product?.photo})`}}/>
                        <h3>{product?.name}</h3>
                        <p>{product?.price}</p>
                    </div>
                </>
            })}
        </div>
        </>
    )
}

export default SuggestionList