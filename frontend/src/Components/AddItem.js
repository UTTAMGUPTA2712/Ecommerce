import { forwardRef, useState } from "react"
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import AddItemButton from "./AddItemButton";
import UploadImage from "./UploadImage";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddItems = ({ itemData }) => {
    const [image, setImage] = useState([])
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(itemData ?? { rating: 0, reviews: [] })
    const changeData = (title, value) => {
        setData(p => ({ ...p, [title]: value }));
    }
    // handle the edit on post description
    // to close the modal of create post and to set post,file,loading,modalopen data to initial value
    const changeImage = (data) => {
        setImage([...image, "http://localhost:1000/" + data])
    }
    const handleCancel = () => {
        setData({ rating: 0, reviews: [] })
        setImage([])
        setOpen(false);
    };
    console.log(data);
    return (
        <>
            <Dialog
                id="additem"
                fullScreen
                open={open}
                onClose={handleCancel}
                TransitionComponent={Transition}
            >
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
                        <AddItemButton value={itemData ? "Save" : "Add"} handleCancel={handleCancel} data={{ ...data, image: image }} />
                    </Toolbar>
                </AppBar>
                <div id="formGrid">
                    <UploadImage changeImage={changeImage} />
                    <TextField
                        required
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
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select></FormControl>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Price"
                        onChange={(e) => changeData("price", e.target.value)}
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₨
                                </InputAdornment>
                            ),
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-multiline-static"
                        label="Description"
                        onChange={(e) => changeData("description", e.target.value)}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                </div>
            </Dialog>
            {/* <button onClick={() => setOpen(true)}>ADD ITEM</button> */}
            <ListItemText onClick={() => setOpen(true)} id="switch-list-label-wifi" primary="ADD ITEM" />

        </>
    )
}

export default AddItems