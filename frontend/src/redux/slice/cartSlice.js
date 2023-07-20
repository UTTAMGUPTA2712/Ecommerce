import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    cart: {},
    coupon:"",
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
        saveCoupon:(state,action) => {
            state.coupon = action.payload
        },
        removeItem: (state, action) => {
            delete state.cart[action.payload]
        },
        setCart: (state, action) => {
            state.cart=action.payload
        }
    }
})
export const { savecart, cleancart, removeItem ,saveCoupon,setCart} = cartSLice.actions
export default cartSLice.reducer