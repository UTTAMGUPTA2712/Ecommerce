import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    cart:{},
}
export const cartSLice=createSlice({
    name:"cart",
    initialState:initialValue,
    reducers:{
        savecart:(state,action)=>{
            state.cart[action.payload.id]=action.payload.value
        },
        cleancart:(state)=>{
            state.cart={}
        },
    }
})
export const {savecart,cleancart} = cartSLice.actions
export default cartSLice.reducer