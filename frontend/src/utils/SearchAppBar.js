import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Search, ShoppingCart, Store } from '@mui/icons-material';
import DrawerComponent from '../Components/DrawerComponent';
import { Avatar, Badge, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const styles = theme => ({
  root: {
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});
const SearchAppBar = (props) => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user.user)
  const cart=useSelector(state=>state.cart.cart)
  const [count,setCount] = useState(0)
  useEffect(()=>{
    let sum=0;
    Object.keys(cart).forEach(key=>{sum+=cart[key]?.value})
    setCount(sum)
  },[cart])
  const { classes } = props;
  return (
    <div id='searchbar' className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <DrawerComponent />
          <Typography onClick={() => navigate("/")} className={classes.title} variant="h6" color="inherit" noWrap>
            E-Commerce
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <IconButton size='large' onClick={() => navigate("/cart")}>
            <Badge badgeContent={count} color='error' sx={{ color: "white" }} >
              <ShoppingCart/>
            </Badge>
          </IconButton>
          <Avatar onClick={()=>navigate("/Profile")} src={user?.image}>{user?.name?.[0]}</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withStyles(styles)(SearchAppBar);