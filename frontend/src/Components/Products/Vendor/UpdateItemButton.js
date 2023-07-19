import { useDispatch } from "react-redux"
import { updateProduct } from "../../../redux/slice/productSlice"
import { Button } from "@mui/material"
import { setMessage } from "../../../redux/slice/messageSlice"
import { draft,  productAdd, serverError } from "../../../data/constants"
import { UpdateProductService } from "../../../services/Product/UpdateProductService"

export const UpdateItemButton = ({ data, handleCancel }) => {
    const dispatch = useDispatch()
    const handleSave = async () => {
        if ((data?.image)?.length === 4 && data.name && data.description && data.price) {
            try {
                const saveItem = await UpdateProductService({ ...data, status: draft })
                console.log(saveItem);
                dispatch(updateProduct({ ...data,status: draft}))
                dispatch(setMessage(productAdd))
                handleCancel()
            } catch (err) {
                console.log(err)
                dispatch(setMessage(serverError))
            }
        } else {
            let message = "PLEASE UPLOAD 4 IMAGES"
            if (data?.image?.length === 4) {
                message = "PLEASE PROVIDE ALL THE FIELDS"
            }
            dispatch(setMessage({ message: message, severity: "info" }))
        }
    }
    return (
        <>
            <Button onClick={handleSave} autoFocus color="inherit">
                SAVE
            </Button>
        </>
    )
}