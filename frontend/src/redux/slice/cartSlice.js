import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    cart:{},
}
export const cartSLice=createSlice({
    name:"cart",
    initialState:initialValue,
    reducers:{
        savecart:(state,action)=>{
            console.log("slice");
            state.cart[action.payload.id]={value:action.payload.value,price:action.payload.price};
        },
        cleancart:(state)=>{
            state.cart={}
        },
        removeItem:(state,action)=>{
            state.cart[action.payload].value=0
        },
    }
})
export const {savecart,cleancart,removeItem} = cartSLice.actions
export default cartSLice.reducer