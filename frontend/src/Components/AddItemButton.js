import { useDispatch } from "react-redux"
import { AddItemService } from "../services/AddItemService"
import { addproduct } from "../redux/slice/productSlice"

const AddItemButton = ({ data, value, handleCancel }) => {
    const dispatch = useDispatch()
    const handleSave = async () => {
        try {
            dispatch(addproduct(data))
            const saveItem = await AddItemService(data)
            console.log("", saveItem)
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