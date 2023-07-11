import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetItemService } from "../../services/GetItemService";

export const fetchProduct=createAsyncThunk("user/saveUser",async()=>{
    try{
        const response=await GetItemService()
        return response
    }catch(err){
        console.log(err);
        return []
    }
})