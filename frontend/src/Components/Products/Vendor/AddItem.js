import { forwardRef, useEffect, useState } from "react"
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Button, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import AddItemButton from "./AddItemButton";
import UploadImage from "../../../utils/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { ShowImages } from "../../UserInterface/ShowImages";
import DraftItemButton from "./DraftItemButton";
import { GetCategory } from "../../../services/Category/GetCategory";
import { UpdateItemButton } from "./UpdateItemButton";
import { serverError } from "../../../data/constants";
import { setMessage } from "../../../redux/slice/messageSlice";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddItems = ({ itemData }) => {
    const [image, setImage] = useState(itemData?.image ?? [])
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user.user?.email)
    const [category, setCategory] = useState([]);
    const [data, setData] = useState(itemData || { sender: user })
    const dispatch = useDispatch()
    const changeData = (title, value) => {
        setData(p => ({ ...p, [title]: value }));
    }
    const changeImage = (data) => {
        setImage([...image, data])
    }
    const handleCancel = () => {
        setData(itemData || { sender: user })
        setImage(itemData?.image ?? [])
        setOpen(false);
    };
    const SaveCategory = async () => {
        const response = await GetCategory()
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            setCategory(response.data)
        }
    }
    useEffect(() => {
        SaveCategory()
    }, [open])
    return (
        <>
            <Dialog
                id="additem"
                fullScreen
                open={open}
                onClose={handleCancel}
                TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCancel}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {itemData ? "Edit Item" : "Add Product"}
                        </Typography>
                        {!itemData && <DraftItemButton data={{ ...data, image: image }} handleCancel={handleCancel} />}
                        {itemData ? <UpdateItemButton handleCancel={handleCancel} data={{ ...data, image: image }} /> : <AddItemButton handleCancel={handleCancel} data={{ ...data, image: image }} />}
                    </Toolbar>
                </AppBar>
                <div id="formGrid">
                    {itemData ? <ShowImages data={itemData?.image} /> : <UploadImage changeImage={changeImage} />}
                    <TextField
                        required
                        value={data?.name}
                        onChange={(e) => changeData("name", e.target.value)}
                        id="filled-required"
                        label="Name Of The Product"
                        variant="filled"
                    />
                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Category"
                            sx={{ textAlign: "left" }}
                            value={data?.category ?? ""}
                            onChange={(e) => changeData("category", e.target.value)}>
                            {category.map(data => (
                                <MenuItem value={data?.name}>{data?.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Price"
                        value={data?.price}
                        onChange={(e) => changeData("price", e.target.value)}
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₹
                                </InputAdornment>
                            ),
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-multiline-static"
                        label="Description"
                        value={data?.description}
                        onChange={(e) => changeData("description", e.target.value)}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                </div>
            </Dialog>
            {itemData ? <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: "#007bb2", color: "whitesmoke" }} fullWidth>EDIT ITEM</Button> : <ListItemText onClick={() => setOpen(true)} id="switch-list-label-wifi" primary="ADD ITEM" />}
        </>
    )
}

export default AddItems