import React from 'react'
import ItemList from '../Components/UserInterface/ItemList';
import SearchAppBar from '../utils/SearchAppBar';
import Filter from '../Components/UserInterface/Filter';
const HomePage = () => {
  return (
    <>
      <div id='homepage'>
        <SearchAppBar />
        <div id='filter'>
          <Filter/>
        </div>
        <ItemList/>
      </div>
    </>
  )
}

export default HomePage