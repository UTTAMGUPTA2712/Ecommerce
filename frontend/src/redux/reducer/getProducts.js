import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetItemService } from "../../services/GetItemService";

export const fetchProduct=createAsyncThunk("product/addproduct",async()=>{
    try{
        const response=await GetItemService()
        return response.data
    }catch(err){
        console.log(err);
        return []
    }
})