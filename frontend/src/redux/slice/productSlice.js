import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    product:[],
}
export const productSLice=createSlice({
    name:"product",
    initialState:initialValue,
    reducers:{
        addproduct:(state,action)=>{
            state.product.push(action.payload)
        },
        setProduct:(state,action)=>{
            state.product=action.payload
        },
        setProductStatus:(state,action)=>{
            for(let item in state.product) {
                if(state.product[item]._id===action.payload._id){
                    state.product[item].status=action.payload.status
                }
            }
        },
        saveReview:(state,action)=>{
            for(let item in state.product) {
                if(state.product[item]._id===action.payload.id){
                    state.product[item].review.push({rate:action.payload.rate,review:action.payload.review})
                }
            }
        }
    }
})
export const {addproduct,setProduct,setProductStatus,saveReview} = productSLice.actions
export default productSLice.reducer