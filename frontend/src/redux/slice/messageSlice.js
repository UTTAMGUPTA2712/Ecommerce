import { createSlice } from "@reduxjs/toolkit"
import { ItemRomoved, cancelOrder, disableUser, googlepopclose, invalidEmail, logUser, orderPlaced, orderUpdate, passwordDoNotMatch, productAdd, saveAnAddress, serverError, userDisabled, userEmailAlreadyExist, userEnabled, userNotFound, userPhonePumberAlreadyExist, wrongPassword } from "../../data/constants";

const initialValue = {
    message: null,
}
export const messageSlice = createSlice({
    name: "message",
    initialState: initialValue,
    reducers: {
        setMessage: (state, action) => {
            switch (action.payload) {
                case serverError: state.message = { message: "Server Is Under Maintaince! Try Again After Some Time", severity: "warning" }
                    break;
                case logUser: state.message = { message: "Successfully Logged In", severity: "success" }
                    break;
                case disableUser: state.message = { message: "User Disabled Please Contact Customer Care!", severity: "info" }
                    break;
                case wrongPassword: case userNotFound: state.message = { message: action.payload, severity: "error" }
                    break;
                case userPhonePumberAlreadyExist: case userEmailAlreadyExist: case passwordDoNotMatch: case invalidEmail: case ItemRomoved:case googlepopclose: state.message = { message: action.payload, severity: "info" }
                    break;
                case userDisabled: case userEnabled: state.message = { message: action.payload, severity: "success" }
                    break;
                case productAdd: state.message = { message: "Product Added Successfully", severity: "success" }
                    break;
                case saveAnAddress: state.message = { message: "Please Save An Address", severity: "info" }
                    break;
                case orderPlaced: state.message = { message: "Order Placed Sucessfully", severity: "success" }
                    break;
                case orderUpdate: case cancelOrder: state.message = { message: "Successfully Updated", severity: "success" }
                    break;
                default:
                    state.message = action.payload
            }
        },
        cleanMessage: (state) => {
            state.message = null
        }
    }
})
export const { setMessage, cleanMessage } = messageSlice.actions
export default messageSlice.reducer