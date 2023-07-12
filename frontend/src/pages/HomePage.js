import React from 'react'
import ItemList from '../Components/ItemList';
import SearchAppBar from '../Components/SearchAppBar';
const HomePage = () => {
  return (
    <>
      <div id='homepage'>
        <SearchAppBar />
        <div id='filter' style={{ backgroundColor: "black" }} /><ItemList/>
      </div>
    </>
  )
}

export default HomePage