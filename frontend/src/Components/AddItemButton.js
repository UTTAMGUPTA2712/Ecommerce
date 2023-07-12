import { useDispatch } from "react-redux"
import { AddItemService } from "../services/AddItemService"
import { addproduct } from "../redux/slice/productSlice"
import { Button } from "@mui/material"
import { setMessage } from "../redux/slice/messageSlice"

const AddItemButton = ({ data, value, handleCancel }) => {
    const dispatch = useDispatch()
    const handleSave = async () => {
        try {
            const saveItem = await AddItemService(data)
            dispatch(addproduct(saveItem))
            dispatch(setMessage({message:"Product Added Successfully",severity:"success"}))
            handleCancel()
        } catch (err) {
            console.log(err)
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