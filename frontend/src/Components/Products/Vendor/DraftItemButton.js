import { useDispatch } from "react-redux"
import { AddItemService } from "../../../services/Product/AddItemService"
import { addproduct } from "../../../redux/slice/productSlice"
import { Button } from "@mui/material"
import { setMessage } from "../../../redux/slice/messageSlice"
import { draft, productAdd, serverError } from "../../../data/constants"

const DraftItemButton = ({ data, handleCancel }) => {
    const dispatch = useDispatch()
    const handleSave = async () => {
        if ((data?.image)?.length === 4) {
            try {
                const saveItem = await AddItemService({ ...data, status: draft })
                dispatch(addproduct({ ...data, _id: saveItem.data.insertedId }))
                dispatch(setMessage(productAdd))
                handleCancel()
            } catch (err) {
                //console.log(err)
                dispatch(setMessage(serverError))
            }
        } else {
            let message = "PLEASE UPLOAD 4 IMAGES"
            dispatch(setMessage({ message: message, severity: "info" }))
        }
    }
    return (
        <>
            <Button onClick={handleSave} autoFocus color="inherit">
                SAVE IN DRAFT
            </Button>
        </>
    )
}

export default DraftItemButton