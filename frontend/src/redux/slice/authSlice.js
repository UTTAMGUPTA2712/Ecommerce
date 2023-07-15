import { createAction, createSlice } from "@reduxjs/toolkit"
import { setMessage } from "./messageSlice"

const initialValue = {
    user: null,
    address: null,
}
export const authSLice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
            state.address = action.payload?.address?.[0]
        },
        setAddress: (state, action) => {
            state.address = state.user.address[action.payload]
        },
        saveAddress: (state, action) => {
            state.user.address = action.payload
            state.address=action.payload[0]
        },
        addOrder: (state, action) => {
            if (state.user.orders) {
                state.user.orders.push(action.payload)
            } else {
                state.user.orders = [action.payload]
            }
        },
        saveName: (state, action) => {
            state.user.name = action.payload
        },
        logoutUser: (state) => {
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveUser, (state, action) => {
            const { dispatch } = action.thunkApi
            console.log("here");
            dispatch(setMessage({ message: "It worked", severity: "info" }))
        })
    }
})
export const { saveUser, logoutUser, saveAddress, saveName, setAddress, addOrder } = authSLice.actions
export default authSLice.reducer