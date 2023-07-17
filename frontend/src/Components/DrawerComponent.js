import IconButton from '@material-ui/core/IconButton';
import { AddToPhotos, Home, LocalShipping, Logout, Menu, Person, RuleFolder, ShoppingBag, ShoppingCart, VerifiedUserSharp } from '@mui/icons-material';
import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AddItems from './AddItem';
import { LogoutUser } from './Logout';
import { useNavigate } from 'react-router-dom';
import { Divider, List } from '@mui/material'
const DrawerComponent = () => {
    const [open, setopen] = useState(false);
    const navigate = useNavigate()
    const listdata = [
        {
            icon: <Person />,
            component: <ListItemText onClick={() => navigate("/profile")} primary="PROFILE" />
        },
        {
            icon: <Home />,
            component: <ListItemText onClick={() => navigate("/")} primary="HOME" />
        },
        {
            icon: <AddToPhotos/>,
            component: <AddItems/>
        },
        {
            icon: <VerifiedUserSharp />,
            component: <ListItemText onClick={() => navigate("/allusers")} primary="ALL USERS" />
        },
        {
            icon: <ShoppingCart />,
            component: <ListItemText onClick={() => navigate("/cart")} primary="CART" />
        },
        {
            icon:<ShoppingBag/>,
            component: <ListItemText onClick={() => navigate("/userorder")} primary="MY ORDERS"/>
        },
        {
            icon:<LocalShipping/>,
            component: <ListItemText onClick={() => navigate("/allorder")} primary="ALL ORDERS"/>
        },
        {
            icon:<RuleFolder/>,
            component: <ListItemText onClick={() => navigate("/setdata")} primary="SET WEBSITE DATA"/>
        },
        {
            icon: <Logout />,
            component: <LogoutUser />
        },
    ]
    return (<>
        <Drawer open={open} onClose={() => setopen(false)}>
            <Box sx={{ width: "22rem", flexShrink: 0, '& .MuiDrawer-paper': { width: "25rem", boxSizing: 'border-box', }, }} variant="persistent" anchor="left" open={open}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} subheader={<ListSubheader>NAVIGATION</ListSubheader>}>
                    {listdata.map(item => <>
                        <Divider />
                        <ListItem sx={{ cursor: "pointer" }}>
                            <ListItemIcon>{item.icon}
                            </ListItemIcon>
                            {item.component}
                        </ListItem></>)}
                    <Divider />
                </List>
            </Box>
        </Drawer>
        <IconButton onClick={() => setopen(true)} color="inherit" aria-label="Open drawer" >
            <Menu />
        </IconButton>
    </>)

}

export default DrawerComponent;