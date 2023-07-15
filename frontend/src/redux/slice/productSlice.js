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
        }
    }
})
export const {addproduct,setProduct} = productSLice.actions
export default productSLice.reducer