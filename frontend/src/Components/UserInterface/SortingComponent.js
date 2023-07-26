import { ListItem, ListSubheader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSorting } from '../../redux/slice/filterSlice';

const listItem = [
    {
        label: "DEFAULT",
        value: ""
    },
    {
        label: "PRICE ASC",
        value: "price"
    },
    {
        label: "PRICE DESC",
        value: "priceRev"
    },
    {
        label: "LATEST ASC",
        value: "latest"
    },
    {
        label: "LATEST DESC",
        value: "latestRev"
    },
    {
        label: "BEST SELLING",
        value: "bestSeller"
    },
]
export const SortingComponent = () => {
    const filter = useSelector(state => state.filter.filter.sorting)
    const dispatch = useDispatch()
    const handleClick = (value) => {
        dispatch(setSorting(value))
    }
    return (
        <>
            <ListSubheader>Sort</ListSubheader>
            {listItem.map((item, index) =>
                <ListItem key={index} onClick={() => handleClick(item?.value)} sx={{ backgroundColor: filter === item?.value ? "#42424230" : "#ffffff", cursor: "pointer" }}>{item.label}</ListItem>
            )}
        </>
    )
}
