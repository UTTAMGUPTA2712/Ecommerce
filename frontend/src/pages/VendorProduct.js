import React from 'react'
import { useSelector } from 'react-redux'
import SearchAppBar from '../utils/SearchAppBar'
import Filter from '../Components/UserInterface/Filter'
import ItemList from '../Components/UserInterface/ItemList'

const VendorProduct = () => {
    const user=useSelector(state=>state.user.user)
  return (
    <>
    <div id='homepage'>
        <SearchAppBar/>
        <Filter/>
        <ItemList userdata={user}/>
    </div>
    </>
  )
}

export default VendorProduct