// import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Menu, Search } from '@mui/icons-material';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddItems from './AddItem';
// import AddItems from './AdDItems';
const menuButton = {
    marginLeft: -12,
    marginRight: 20,
}

const DrawerComponent = () => {
    const [open, setopen] = useState(false);

    return(<>
        <Drawer
        open={open}
        onClose={() => setopen(false)}
    >
        <Box
            sx={{
                width: "25rem",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "25rem",
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <AddItems/>

        </Box>
    </Drawer>
        <IconButton onClick={() => setopen(true)} className={menuButton} color="inherit" aria-label="Open drawer" >
            <Menu />
        </IconButton>
    </>)

}

export default DrawerComponent;