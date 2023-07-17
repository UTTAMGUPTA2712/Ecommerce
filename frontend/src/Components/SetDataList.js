import React, { useState } from 'react'
import SearchAppBar from '../utils/SearchAppBar'
import { List, ListItemButton, ListSubheader, ListItemIcon, ListItemText } from '@mui/material'
import { Category, Discount, Drafts, Send, ViewCarousel } from '@mui/icons-material'

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
const SetDataList = ({setData}) => {
  return (
    <>
      <div>
        <List
          sx={{ margin: "1rem", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ bgcolor: "#424242", color: "white" }}
              component="div" >
              Website Data
            </ListSubheader>
          }
        >
          {listData.map((item, index) => (
            <ListItemButton onClick={()=>setData(index)} key={index}>
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