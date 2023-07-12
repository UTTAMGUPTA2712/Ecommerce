import { createSlice } from "@reduxjs/toolkit"
import { fetchProduct } from "../reducer/getProducts"

const initialValue = {
    user: null,
}
export const authSLice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload

        },
        saveAddress: (state, action) => {
            state.user.address = action.payload
        },
        saveName: (state, action) => {
            state.user.name=action.payload
        },
        logoutUser: (state) => {
            state.user = null
        },
    },

})
export const { saveUser, logoutUser, saveAddress,saveName } = authSLice.actions
export default authSLice.reducer