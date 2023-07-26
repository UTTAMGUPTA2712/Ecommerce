import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { published } from '../../../data/constants'

const SuggestionList = ({ data, id }) => {
    const products = useSelector(state => state.product.product)
    const product = products.filter(item => (item?.status === published) && (item?.category === data) && (item._id !== id))
    const navigate = useNavigate()
    if (product.length > 0) return (
        <div style={{ backgroundColor: "white", border: "1px solid grey", marginTop: "1em", borderRadius: "5px",
        // boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px"
    }}>
            <h2>Suggestions For You</h2>
            <div id='suggestion'>
                {product.map((item, index) => {
                    return <React.Fragment key={index}>
                        <div style={{ backgroundColor: "white",cursor:"pointer"}} onClick={() => navigate("/productDetail", { state: item })} className='suggestItem'>
                            <img src={item?.image?.[0]} style={{ height: "10em" }} alt=''/>
                            <h3>{item?.name}</h3>
                            <p>₹ {item?.price}/-</p>
                        </div>
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}

export default SuggestionList