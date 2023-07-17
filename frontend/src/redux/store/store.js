import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import authSlice from "../slice/authSlice"
import productSlice from "../slice/productSlice"
import { persistReducer } from "redux-persist"
import messageSlice from "../slice/messageSlice"
import filterSlice from "../slice/filterSlice"
import cartSlice from "../slice/cartSlice"
import thunk from "redux-thunk";
import dataSlice from "../slice/dataSlice"
const config={
    key:"ecommerce",
    version:1,
    storage,
}
const combineReducer=combineReducers({
    user:authSlice,
    product:productSlice,
    message:messageSlice,
    filter:filterSlice,
    cart:cartSlice,
    data:dataSlice
})
const persistReducers=persistReducer(config,combineReducer)
export const store=configureStore({
    reducer: persistReducers,
    middleware:[thunk],
})