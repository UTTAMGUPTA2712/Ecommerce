import IconButton from '@material-ui/core/IconButton';
import { AccountTree, AddToPhotos, Close, Home, LocalShipping, Logout, Menu, Person, PersonSearch, RuleFolder, ShoppingBag, ShoppingCart, SpaceDashboard, VerifiedUserSharp } from '@mui/icons-material';
import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, List } from '@mui/material';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AddItems from '../Products/Vendor/AddItem';
import { LogoutUser } from '../Auth/Logout';
import { useNavigate } from 'react-router-dom';
import { CategoryComponent } from './CategoryComponent';
import { useSelector } from 'react-redux';
import { admin, shipper, vendor } from '../../data/constants';
const DrawerComponent = () => {
  const [open, setopen] = useState(false);
  const navigate = useNavigate()
  const loggedUserTitle = useSelector(state => state.user.user?.title)
  const userlistnav = [
    {
      icon: <Person />,
      component: <ListItemText onClick={() => navigate("/profile")} primary="PROFILE" />
    },
    {
      icon: <SpaceDashboard />,
      component: <ListItemText onClick={() => navigate("/")} primary="DASHBOARD" />
    },
    {
      icon: <Home />,
      component: <ListItemText onClick={() => navigate("/home")} primary="HOME" />
    },
    {
      icon: <ShoppingCart />,
      component: <ListItemText onClick={() => navigate("/cart")} primary="CART" />
    },
    {
      icon: <ShoppingBag />,
      component: <ListItemText onClick={() => navigate("/userorder")} primary="MY ORDERS" />
    },
  ]
  const vendorList = [
    {
      icon: <VerifiedUserSharp />,
      component: <ListItemText onClick={() => navigate("/vendorproduct")} primary="MY PRODUCT" />
    },

    {
      icon: <AddToPhotos />,
      component: <AddItems />
    },
  ]
  const shipperList = [
    {
      icon: <LocalShipping />,
      component: <ListItemText onClick={() => navigate("/allorder")} primary="ALL ORDERS" />
    },
  ]
  const listdata = [
    {
      icon: <Person />,
      component: <ListItemText onClick={() => navigate("/profile")} primary="PROFILE" />
    },
    {
      icon: <SpaceDashboard />,
      component: <ListItemText onClick={() => navigate("/")} primary="DASHBOARD" />
    },
    {
      icon: <Home />,
      component: <ListItemText onClick={() => navigate("/home")} primary="HOME" />
    },
    {
      icon: <VerifiedUserSharp />,
      component: <ListItemText onClick={() => navigate("/vendorproduct")} primary="MY PRODUCT" />
    },
    {
      icon: <AddToPhotos />,
      component: <AddItems />
    },
    {
      icon: <PersonSearch />,
      component: <ListItemText onClick={() => navigate("/allusers")} primary="ALL USERS" />
    },
    {
      icon: <ShoppingCart />,
      component: <ListItemText onClick={() => navigate("/cart")} primary="CART" />
    },
    {
      icon: <ShoppingBag />,
      component: <ListItemText onClick={() => navigate("/userorder")} primary="MY ORDERS" />
    },
    {
      icon: <LocalShipping />,
      component: <ListItemText onClick={() => navigate("/allorder")} primary="ALL ORDERS" />
    },
    {
      icon: <AccountTree />,
      component: <ListItemText onClick={() => navigate("/productcontrol")} primary="PRODUCT CONTROL" />
    },
    {
      icon: <RuleFolder />,
      component: <ListItemText onClick={() => navigate("/setdata")} primary="SET WEBSITE DATA" />
    },
  ]
  // console.log(loggedUserTitle);
  return (
    <>
      <Drawer open={open} onClose={() => setopen(false)}>
        <Box sx={{ width: "22rem", flexShrink: 0, '& .MuiDrawer-paper': { width: "25rem", boxSizing: 'border-box', }, }} variant="persistent" anchor="left" open={open}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }} subheader={<IconButton onClick={() => setopen(false)}><Close /></IconButton>}>
            <CategoryComponent />
            <ListSubheader>NAVIGATION</ListSubheader>
            {loggedUserTitle === admin &&
              listdata.map((item, index) => (
                <React.Fragment key={index}>
                  <Divider />
                  <ListItem className='listItem' sx={{ cursor: "pointer" }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.component}
                  </ListItem>
                </React.Fragment>
              ))
            }
            {loggedUserTitle !== admin &&
              userlistnav.map((item, index) => (
                <React.Fragment key={index}>

                  <Divider />
                  <ListItem className='listItem' sx={{ cursor: "pointer" }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.component}
                  </ListItem>
                </React.Fragment>
              ))
            }
            {loggedUserTitle === vendor && vendorList?.map((item, index) => (
              <React.Fragment key={index}>

                <Divider />
                <ListItem className='listItem' sx={{ cursor: "pointer" }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.component}
                </ListItem>
              </React.Fragment>
            ))}
            {loggedUserTitle === shipper && shipperList?.map((item, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem className='listItem' sx={{ cursor: "pointer" }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.component}
                </ListItem>
              </React.Fragment>
            ))}
            <Divider />
            <ListItem className='listItem' sx={{ cursor: "pointer" }}>
              <ListItemIcon><Logout /></ListItemIcon>
              <LogoutUser />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <IconButton onClick={() => setopen(true)} color="inherit" aria-label="Open drawer" >
        <Menu />
      </IconButton>
    </>
  );
}
export default DrawerComponent;