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
        updateProduct:(state,action)=>{
            for(let item in state.product) {
                if(state.product[item]._id===action.payload._id){
                    state.product[item]=action.payload
                }
            }
        },
        saveReview:(state,action)=>{
            for(let item in state.product) {
                if(state.product[item]._id===action.payload.id){
                    state.product[item].review.push(action.payload.review)
                    state.product[item].rate=action.payload.rate
                }
            }
        }
    }
})
export const {addproduct,setProduct,setProductStatus,saveReview,updateProduct} = productSLice.actions
export default productSLice.reducer