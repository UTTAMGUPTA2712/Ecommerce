import { useDispatch } from "react-redux"
import { AddItemService } from "../services/AddItemService"
import { addproduct } from "../redux/slice/productSlice"
import { Button } from "@mui/material"
import { setMessage } from "../redux/slice/messageSlice"

const AddItemButton = ({ data, value, handleCancel }) => {
    const dispatch = useDispatch()
    const handleSave = async () => {
        if ((data?.image)?.length === 4 && data.name && data.description && data.price) {
            try {
                const saveItem = await AddItemService(data)
                dispatch(addproduct({...data,_id:saveItem.data.insertedId}))
                dispatch(setMessage({ message: "Product Added Successfully", severity: "success" }))
                handleCancel()
            } catch (err) {
                console.log(err)
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
                {value}
            </Button>
        </>
    )
}

export default AddItemButton