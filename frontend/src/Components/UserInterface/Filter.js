import { useEffect, useState } from "react";
import { ListItem, ListSubheader, List, Rating, Slider, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { cleanFilter, setLimit, setRating } from "../../redux/slice/filterSlice";
import { CategoryComponent } from "./CategoryComponent";
import { SortingComponent } from "./SortingComponent";
const minDistance = 1000;
const Filter = () => {
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch()
  const value1 = [filter?.lowerLimit, filter?.upperLimit];
  const [filterSum, setFilterSum] = useState(0)
  const handleChange1 = (_, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let v1, v2
    if (activeThumb === 0) {
      v1 = Math.min(newValue[0], value1[1] - minDistance)
      v2 = value1[1]
    } else {
      v1 = value1[0]
      v2 = Math.max(newValue[1], value1[0] + minDistance)
    }
    dispatch(setLimit({ upperLimit: v2, lowerLimit: v1 }));
  };
  useEffect(() => {
    setFilterSum(0)
    if (filter.upperLimit !== 999999) setFilterSum(p => p + 1)
    if (filter.lowerLimit !== 0) setFilterSum(p => p + 1)
    if (filter.rating !== 0) setFilterSum(p => p + 1)
    if (filter.search !== "") setFilterSum(p => p + 1)
    if (filter.category !== "") setFilterSum(p => p + 1)
    if (filter.sorting !== "") setFilterSum(p => p + 1)
  }, [filter])
  return (
    <>
      <div id="filter">
        <List>
          <SortingComponent />
          <ListSubheader>Choose the Rating</ListSubheader>
          {Array(5).fill().map((_, index) => (
            <ListItem key={index} sx={{ bgcolor: filter?.rating === (4 - index) ? "#007bb210" : "#ffffff",cursor:"pointer" }} onClick={() => dispatch(setRating(4 - index))}>
              <Rating value={4 - index} readOnly /> or more
            </ListItem>
          ))}
          <ListSubheader>Set The Product Range(in Rs.)</ListSubheader>
          <ListItem sx={{ bgcolor: "white" }}>
            <Slider
              sx={{ zIndex: 3 }}
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              max={999999}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              disableSwap
            />
          </ListItem>
          <CategoryComponent />
          <ListItem sx={{ bgcolor: "white" }}>
            <Button fullWidth variant="contained" onClick={() => dispatch(cleanFilter())}>reset filter {filterSum > 0 && <span style={{ fontWeight: "200" }}>{`[${filterSum} Applied]`}</span>}</Button>
          </ListItem>
        </List>
      </div>
    </>
  )
}
export default Filter