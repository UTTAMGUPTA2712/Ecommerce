import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    coupons:[],
    carousal:[],
    category:[]
}
export const dataSlice=createSlice({
    name:"data",
    initialState:initialValue,
    reducers:{
        setdata:(state,action)=>{
            state.coupons=action.payload.coupons
            state.carousal=action.payload.carousal
            state.category=action.payload.category
        }
    }
})
export const {setdata} = dataSlice.actions
export default dataSlice.reducer