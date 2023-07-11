import React from 'react'
import SearchAppBar from '../SearchAppBar'
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import ItemList from '../ItemList';
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