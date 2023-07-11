import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    user:null,
}
export const authSLice=createSlice({
    name:"user",
    initialState:initialValue,
    reducers:{
        saveUser:(state,action)=>{
            state.user=action.payload

        },
        logout:(state)=>{
            state.user=null
        },
    },
})
export const {saveUser,logout} = authSLice.actions
export default authSLice.reducer