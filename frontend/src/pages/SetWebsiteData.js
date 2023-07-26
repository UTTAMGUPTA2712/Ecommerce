import React, { useState } from 'react'
import SearchAppBar from '../Components/UserInterface/SearchAppBar'
import SetDataList from '../Components/Admin/SetDataList'
import { SetCoupon } from '../Components/Admin/SetCoupon'
import { SetCategory } from '../Components/Admin/SetCategory'
import { SetCarousal } from '../Components/Admin/SetCarousal'
const SetWebsiteData = () => {
  const [data, setData] = useState(0)
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
  return (
    <>
      <div id='adminpage'>
        <SearchAppBar />
        <SetDataList data={data} setData={changeData} />
        <div id='list'>
          {componentSelector(data)}
        </div>
      </div>
    </>
  )
}

export default SetWebsiteData