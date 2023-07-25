import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    filter: {
        rating: 0,
        search: "",
        category: "",
        upperLimit: 999999,
        lowerLimit: 0,
        sorting: ""
    },
}
export const filterSLice = createSlice({
    name: "filter",
    initialState: initialValue,
    reducers: {
        savefilter: (state, action) => {
            state.filter = action.payload
        },
        setRating: (state, action) => {
            state.filter.rating = action.payload
        },
        setLimit: (state, action) => {
            state.filter.upperLimit = action.payload.upperLimit
            state.filter.lowerLimit = action.payload.lowerLimit
        },
        setCategory: (state, action) => {
            state.filter.category = action.payload
        },
        setSearch: (state, action) => {
            state.filter.search = action.payload
        },
        setSorting: (state, action) => {
            state.filter.sorting = action.payload
        },
        cleanFilter: (state) => {
            state.filter = { rating: 0, search: "", category: "", upperLimit: 999999, lowerLimit: 0, sorting: "" }
        },
    }
})
export const { savefilter, cleanFilter, setCategory, setLimit, setRating, setSearch, setSorting } = filterSLice.actions
export default filterSLice.reducer