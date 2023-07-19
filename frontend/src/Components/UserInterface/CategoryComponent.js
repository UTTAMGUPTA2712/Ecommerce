import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, List, Rating, Slider, Button, Collapse, ListItemButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategory } from '../../services/Category/GetCategory';
import { useEffect, useState } from 'react';
import { ExpandLess, ExpandMore, Style } from '@mui/icons-material';
import { setCategory } from '../../redux/slice/filterSlice';
import { useNavigate } from 'react-router-dom';
import { serverError } from '../../data/constants';
import { setMessage } from '../../redux/slice/messageSlice';
export const CategoryComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const filter = useSelector(state => state.filter.filter.category)
    const [data, setData] = useState()
    const [open, setOpen] = useState(false)
    const getData = async () => {
        const response = await GetCategory()
        if (response.data === serverError) { dispatch(setMessage(serverError)) } else {

            setData(response.data)
        }
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
            <ListItem sx={{ bgcolor: "white" }} onClick={() => setOpen(!open)}>
                <ListItemIcon><Style /></ListItemIcon>
                <ListItemText primary="Choose Category" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton style={{ backgroundColor: (filter === "") ? "#42424230" : "" }} onClick={() => handleClick("")} sx={{ pl: 4, backgroundColor: "#f0f0f0" }}>
                        <ListItemText primary="ALL" />
                    </ListItemButton>
                    {data?.map(value => (
                        <ListItemButton style={{ backgroundColor: (filter === value?.name) ? "#42424230" : "" }} onClick={() => handleClick(value?.name)} sx={{ pl: 4, backgroundColor: "#f0f0f0" }}>
                            <ListItemText primary={value?.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </>
    )
}
