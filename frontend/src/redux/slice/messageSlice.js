import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    notifications:[],
    message:null,
}
export const messageSlice=createSlice({
    name:"message",
    initialState:initialValue,
    reducers:{
        setMessage:(state,action)=>{
            state.notifications.push({message:action.payload.message,time:new Date()})
            state.message=action.payload
        },
    }
})
export const {setMessage} = messageSlice.actions
export default messageSlice.reducer