import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ShoppingBag, ShoppingCart } from '@mui/icons-material';
import DrawerComponent from '../Components/UserInterface/DrawerComponent';
import { Avatar, Badge, Button, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchComponent from '../Components/UserInterface/SearchComponent';

const styles = theme => ({
  root: {
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
});
const SearchAppBar = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(state => state.user.user)
  const cart = useSelector(state => state.cart.cart)
  const [count, setCount] = useState(0)
  useEffect(() => {
    let sum = 0;
    Object.keys(cart).forEach(key => { sum += cart[key]?.value })
    setCount(sum)
  }, [cart])
  const { classes } = props;
  return (
    <div id='searchbar' className={classes.root}>
      <AppBar style={{ backgroundColor: "white", color: "#0f0f0f" }} position="static">
        <Toolbar>
          <DrawerComponent />
          <Typography onClick={() => navigate("/")} className={classes.title} variant="h6" color="inherit" noWrap>
            E-Commerce
          </Typography>
          <div className={classes.grow} />
          {(location.pathname === "/home"||location.pathname === "/vendorproduct") && <SearchComponent />}
          <Button sx={{ margin: "0 3px" }} variant='outlined' size='large' onClick={() => navigate("/userorder")} startIcon={<ShoppingBag sx={{ color: "black", fontSize: "2rem" }} />}>
            Orders
          </Button>
          <IconButton size='large' onClick={() => navigate("/cart")}>
            <Badge badgeContent={count} color='error' >
              <ShoppingCart sx={{ color: "black", fontSize: "2rem" }} />
            </Badge>
          </IconButton>
          <Avatar sx={{ bgcolor: "#00b0ff" }} onClick={() => navigate("/Profile")} src={user?.image}>{user?.name?.[0]}</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(SearchAppBar);