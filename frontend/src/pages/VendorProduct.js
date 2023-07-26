import { useSelector } from 'react-redux'
import Filter from '../Components/UserInterface/Filter'
import ItemList from '../Components/UserInterface/ItemList'
import React, { useState } from 'react'
import { disableProduct, draft, enableProduct, outOfStock, published } from '../data/constants'
import SearchAppBar from '../Components/UserInterface/SearchAppBar'
import { List, ListItemButton, ListSubheader, ListItemIcon, ListItemText } from '@mui/material'
import { AssignmentTurnedIn, CreditCardOff, DensitySmall, Drafts, HourglassTop, ProductionQuantityLimits } from '@mui/icons-material'

const listData = [
  {
    label: "ALL",
    value: "",
    icon: <DensitySmall />
  },
  {
    label: "PRODUCT SENT FOR APPROVAL",
    value: enableProduct,
    icon: <HourglassTop />
  },
  {
    label: "DISABLED PRODUCT",
    value: disableProduct,
    icon: <CreditCardOff />
  },
  {
    label: "APPROVED PRODUCT",
    value: published,
    icon: <AssignmentTurnedIn />
  },
  {
    label: "PRODUCTS IN DRAFT",
    value: draft,
    icon: <Drafts />
  },
  {
    label: "PRODUCT OUT OF STOCK",
    value: outOfStock,
    icon: <ProductionQuantityLimits />
  },
]
const VendorProduct = () => {
  const user = useSelector(state => state.user.user)
  const [filter, setFilter] = useState("")
  return (
    <>
      <div id='homepage'>
        <SearchAppBar />
        <div style={{ overflow: "hidden auto", height: "100%" }}>
          <List
            sx={{ backgroundColor: "white" }}
            subheader={
              <ListSubheader>
                Filter Products
              </ListSubheader>
            }>
            {listData.map((item, index) => (
              <ListItemButton sx={{ backgroundColor: filter === item.value ? "#42424230" : "" }} onClick={() => setFilter(item.value)} key={index}>
                <ListItemIcon>
                  {item?.icon}
                </ListItemIcon>
                <ListItemText primary={item?.label} />
              </ListItemButton>
            ))}
          </List>
          <Filter />
        </div>
        <ItemList userdata={user} itemsType={filter} />
      </div>
    </>
  )
}

export default VendorProduct