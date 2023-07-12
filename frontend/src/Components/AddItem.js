import { forwardRef, useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InputAdornment, ListItemText, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AddItemButton from "./AddItemButton";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const AddItems = ({ itemData }) => {

    // console.log(value);
    // const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(itemData ?? { rating: 0, reviews: [] })
    const changeData = (title, value) => {
        setData(p => ({ ...p, [title]: value }));
    }
    // const currentUser = useSelector((state) => state.auth.authDetail)
    // const id = uniqid()
    // const [post, setPost] = useState({ comment: [], likes: [], sender: currentUser.userId, description: "" })
    const [fileList, setFileList] = useState([]);
    // handle the edit on post description
    const handleEdit = (title, value) => {
        // setPost((p) => ({ ...p, [title]: value }))
    }
    // to show modal
    const showModal = () => {
        setOpen(true);
    };
    // to upload the post
    const handleOk = async () => {
        // setLoading(true);
        // // path of file in storage
        // const path = currentUser.userId + "/" + fileList?.[0].name;
        // // create reference
        // const storageRef = ref(firebaseStorage, path);
        // // uploading the file
        // const uploaded = await uploadBytes(storageRef, fileList?.[0].originFileObj)
        // if (uploaded) {
        //     // once uploaded show messae of uploaded
        //     await setDoc(doc(db, "Posts", id), { ...post, path: path, postId: id, time: serverTimestamp() }).then(
        //         () => {
        //             message.success('Post Uploaded Successfully!');
        //         }
        //     ).catch(
        //         (err) => console.error(err)
        //     )
        //     // to set post,file,loading,modalopen data to initial value
        //     setLoading(false);
        //     handleCancel();
        // }
    };
    // to close the modal of create post and to set post,file,loading,modalopen data to initial value
    const handleCancel = () => {
        setOpen(false);
        // setPost({ comment: [], likes: [], sender: currentUser.userId, description: "" })
        // setFileList([])
    };
    // to keep track of weather the media has been uploaded or not hand to show th media
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    // toggle upload media button in modal
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </div>
    );
    return (
        <>

            <Dialog
                id="additem"
                fullScreen
                open={open}
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => setOpen(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {itemData ? "Edit Item" : "Add Item"}
                        </Typography>
                        <AddItemButton value={itemData ? "Save" : "Add"} handleCancel={handleCancel} data={data} />
                    </Toolbar>
                </AppBar>
                <div id="formGrid">
                    <Upload
                        action="http://localhost:1000/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}>
                        {fileList.length >= 4 ? null : uploadButton}
                    </Upload>

                    <TextField
                        required
                        onChange={(e) => changeData("name", e.target.value)}
                        id="filled-required"
                        label="Required"
                        defaultValue="Hello World"
                        variant="filled"
                    />
                    <TextField
                        id="input-with-icon-textfield"
                        label="TextField"
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
                        label="Multiline"
                        onChange={(e) => changeData("description", e.target.value)}

                        multiline
                        rows={4}
                        defaultValue="Default Value"
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