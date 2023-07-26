import { List, ListItemButton, ListSubheader, ListItemIcon, ListItemText } from '@mui/material'
import { Category, Discount, ViewCarousel } from '@mui/icons-material'

const listData = [
  {
    label: "Carousal",
    icon: <ViewCarousel />
  },
  {
    label: "Coupons",
    icon: <Discount />
  },
  {
    label: "Item Category",
    icon: <Category />
  },
]
const SetDataList = ({ data,setData }) => {
  return (
    <>
      <div>
        <List
          sx={{ margin: "1rem", width: '90%', bgcolor: 'background.paper', boxShadow: " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div" >
              Website Data
            </ListSubheader>
          }
        >
          {listData.map((item, index) => (
            <ListItemButton onClick={() => setData(index)} sx={{ backgroundColor:data===index?"lightgrey":""}} key={index}>
              <ListItemIcon>
                {item?.icon}
              </ListItemIcon>
              <ListItemText primary={item?.label} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </>
  )
}

export default SetDataList