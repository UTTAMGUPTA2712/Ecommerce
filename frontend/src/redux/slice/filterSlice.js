import { createSlice } from "@reduxjs/toolkit"

const initialValue={
    filter:{},
}
export const filterSLice=createSlice({
    name:"filter",
    initialState:initialValue,
    reducers:{
        savefilter:(state,action)=>{
            state.filter[action.payload.title]=action.payload.value
        },
        cleanFilter:(state)=>{
            state.filter={}
        },
    }
})
export const {savefilter,cleanFilter} = filterSLice.actions
export default filterSLice.reducer