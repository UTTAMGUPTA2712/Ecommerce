import React, { useEffect, useState } from 'react'
import ItemList from '../Components/UserInterface/ItemList'
import { disableProduct, draft, enableProduct, outOfStock, published } from '../data/constants'
import SearchAppBar from '../utils/SearchAppBar'
import { List, ListItemButton, ListSubheader, ListItemIcon, ListItemText } from '@mui/material'
import { AssignmentTurnedIn, CreditCardOff, DensitySmall, Drafts, HourglassTop, ProductionQuantityLimits } from '@mui/icons-material'

const listData = [
    {
        label: "ALL",
        value: "",
        icon: <DensitySmall/>
    },
    {
        label: "PRODUCT SENT FOR APPROVAL",
        value: enableProduct,
        icon: <HourglassTop/>
    },
    {
        label: "DISABLED PRODUCT",
        value: disableProduct,
        icon: <CreditCardOff/>
    },
    {
        label: "APPROVED PRODUCT",
        value: published,
        icon:<AssignmentTurnedIn/>
    },
    {
        label: "PRODUCTS IN DRAFT",
        value: draft,
        icon: <Drafts/>
    },
    {
        label: "PRODUCT OUT OF STOCK",
        value: outOfStock,
        icon: <ProductionQuantityLimits/>
    },
]
const DraftProduct = (data="") => {
    const [filter, setFilter] = useState("")
    return (
        <>
            <div id='homepage'>
                <SearchAppBar />
                <List
                sx={{padding:"1rem",boxShadow:" rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"}}
                subheader={
                    <ListSubheader>
                        Filter Products
                    </ListSubheader>
                }>
                    {listData.map((item, index) => (
                        <ListItemButton sx={{backgroundColor:filter===item.value?"#42424230":""}} onClick={() => setFilter(item.value)} key={index}>
                            <ListItemIcon>
                                {item?.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    ))}
                    
                </List>
                <ItemList itemsType={filter} />
            </div>
        </>
    )
}

export default DraftProduct