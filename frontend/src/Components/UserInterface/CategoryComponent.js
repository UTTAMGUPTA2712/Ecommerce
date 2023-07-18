import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, List, Rating, Slider, Button, Collapse, ListItemButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { GetCategory } from '../../services/Category/GetCategory';
import { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore, Style } from '@mui/icons-material';
import { setCategory } from '../../redux/slice/filterSlice';
import { useNavigate } from 'react-router-dom';
export const CategoryComponent = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [data, setData] = useState()
    const [open, setOpen] = useState(false)
    const getData = async () => {
        const response = await GetCategory()
        setData(response.data)
    }
    const handleClick = (value) => {
        dispatch(setCategory(value))
        navigate("/home")
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <ListItem sx={{ bgcolor: "white" }} onClick={()=>setOpen(!open)}>
                <ListItemIcon><Style /></ListItemIcon>
                <ListItemText primary="Choose Category" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {data?.map(value => (
                        <ListItemButton onClick={()=>handleClick(value?.name)} sx={{ pl: 4, backgroundColor: "#f0f0f0" }}>
                            <ListItemText primary={value?.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    )
}
