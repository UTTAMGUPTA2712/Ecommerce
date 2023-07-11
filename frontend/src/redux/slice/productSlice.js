import { createSlice } from "@reduxjs/toolkit"
import { fetchProduct } from "../reducer/getProducts"

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
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            action.pending = false;
            state.Fact = action.payload;
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            action.pending = false;
            action.error = "FACT API REJECTED";
        });
        builder.addCase(fetchProduct.pending, (state, action) => {
            action.pending = true;
        });
    }
})
export const {addproduct,setProduct} = productSLice.actions
export default productSLice.reducer