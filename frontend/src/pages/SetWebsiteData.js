import React, { useEffect, useState } from 'react'
import SearchAppBar from '../utils/SearchAppBar'
import { List, ListItemButton, ListSubheader, ListItemIcon, ListItemText } from '@mui/material'
import { Category, Discount, Drafts, Send, ViewCarousel } from '@mui/icons-material'
import SetDataList from '../Components/SetDataList'
import { SetCoupon } from '../Components/SetCoupon'
import { SetCategory } from '../Components/SetCategory'
import { SetCarousal } from '../Components/SetCarousal'
// import { GetWebsiteData } from '../services/GetWebsiteData'
import { useDispatch } from 'react-redux'

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
const SetWebsiteData = () => {
  const [data, setData] = useState(0)
  const [coupons, setCoupons] = useState([])
  const [category, setCategory] = useState([])
  const [carousal, setCarousal] = useState([])
  const changeData = (value) => {
    setData(value)
  }
  const componentSelector = (index) => {
    switch (index) {
      case 1: return <SetCoupon />;
      case 2: return <SetCategory />;
      default: return <SetCarousal />;
    }
  }
  const getData = async () => {
    
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div id='adminpage'>
        <SearchAppBar />
        <SetDataList setData={changeData} />
        <div id='list'>
          {componentSelector(data)}
        </div>
      </div>
    </>
  )
}

export default SetWebsiteData