import { useState } from "react";
import { Drawer, ListItem, ListItemIcon, ListItemText, ListSubheader, Divider, List, Rating, Slider, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { cleanFilter, setLimit, setRating } from "../../redux/slice/filterSlice";
const minDistance = 1000;
const Filter = () => {
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch()
  const value1 = [filter?.lowerLimit,filter?.upperLimit];
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let v1,v2
    if (activeThumb === 0) {
      v1=Math.min(newValue[0], value1[1] - minDistance)
      v2=value1[1]
    } else {
      v1=value1[0]
      v2=Math.max(newValue[1], value1[0] + minDistance)
    }
    // setValue1([v1,v2])
    dispatch(setLimit({upperLimit:v2,lowerLimit:v1}));
  };
  return (
    <>
      <List>
        <ListSubheader>Choose the Rating</ListSubheader>
        {Array(5).fill().map((_, index) => (
          <ListItem sx={{ bgcolor: filter?.rating === index ? "#42424220" : "#ffffff" }} onClick={() => dispatch(setRating(index))}>
            <Rating value={index} readOnly /> or more
          </ListItem>
        ))}
        <ListSubheader>Set The Product Range(in Rs.)</ListSubheader>
        <ListItem>
        <Slider
        sx={{zIndex:3}}
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        max={9999}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
      /></ListItem>
      <ListItem>
      <Button fullWidth variant="contained" onClick={()=>dispatch(cleanFilter())}>reset filter</Button>
      </ListItem>
      </List>

    </>
  )
}
export default Filter