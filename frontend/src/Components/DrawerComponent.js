import IconButton from '@material-ui/core/IconButton';
import { AddToPhotos, Home, Logout, Menu, Person, ShoppingCart } from '@mui/icons-material';
import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AddItems from './AddItem';
import { LogoutUser } from './Logout';
import { useNavigate } from 'react-router-dom';
import { Divider, List } from '@mui/material'

// import AddItems from './AdDItems';
const menuButton = {
    marginLeft: -12,
    marginRight: 20,
}

const DrawerComponent = () => {
    const [open, setopen] = useState(false);
    const navigate = useNavigate()
    const listdata=[
        {
            icon:<Person/>,
            component:<ListItemText onClick={() => navigate("/profile")} primary="PROFILE"/>
        },
        {
            icon:<Home/>,
            component:<ListItemText onClick={() => navigate("/")} primary="HOME"/>
        },
        {
            icon:<AddToPhotos/>,
            component:<AddItems />
        },
        {
            icon:<ShoppingCart/>,
            component:<ListItemText onClick={() => navigate("/cart")} primary="CART"/>
        },
        {
            icon:<Logout/>,
            component:<LogoutUser />
        },
    ]
    return (<>
        <Drawer open={open} onClose={() => setopen(false)}>
            <Box sx={{ width: "22rem", flexShrink: 0, '& .MuiDrawer-paper': { width: "25rem", boxSizing: 'border-box', }, }} variant="persistent" anchor="left" open={open}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }} subheader={<ListSubheader>NAVIGATION</ListSubheader>}>
                    {listdata.map(item=><>
                    <Divider/>
                    <ListItem sx={{cursor:"pointer"}}>
                        <ListItemIcon>{item.icon}
                        </ListItemIcon>
                        {item.component}
                    </ListItem></>)}
                    <Divider/>
                </List>
            </Box>
        </Drawer>
        <IconButton onClick={() => setopen(true)} className={menuButton} color="inherit" aria-label="Open drawer" >
            <Menu />
        </IconButton>
    </>)

}

export default DrawerComponent;