import React from 'react'
import ItemList from '../Components/UserInterface/ItemList';
import SearchAppBar from '../Components/UserInterface/SearchAppBar';
import Filter from '../Components/UserInterface/Filter';
const HomePage = () => {
  return (
    <>
      <div id='homepage'>
        <SearchAppBar />
        <Filter />
        <ItemList />
      </div>
    </>
  )
}

export default HomePage