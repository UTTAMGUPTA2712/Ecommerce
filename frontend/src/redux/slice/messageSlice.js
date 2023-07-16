import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    message:null,
}
export const messageSlice=createSlice({
    name:"message",
    initialState:initialValue,
    reducers:{
        setMessage:(state,action)=>{
            state.message=action.payload
        },
        cleanMessage:(state)=>{
            state.message=null
        }
    }
})
export const {setMessage,cleanMessage} = messageSlice.actions
export default messageSlice.reducer