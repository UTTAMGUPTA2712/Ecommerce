import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    cart: {},
}
export const cartSLice = createSlice({
    name: "cart",
    initialState: initialValue,
    reducers: {
        savecart: (state, action) => {
            if (action.payload.value === 0) {
                delete state.cart[action.payload.id]
            } else {
                state.cart[action.payload.id] = { value: action.payload.value, data: action.payload.data };
            }
        },
        cleancart: (state) => {
            state.cart = {}
        },
        removeItem: (state, action) => {
            delete state.cart[action.payload]
        },
    }
})
export const { savecart, cleancart, removeItem } = cartSLice.actions
export default cartSLice.reducer